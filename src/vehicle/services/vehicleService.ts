import { AppDataSource } from '../../data-source/database';
import { Valuation } from '../entities/valuation.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { LoanApplication } from '../entities/loanApplication.entity';
import calculateCarValuation from '../../utils/valuations';
import { CarValuationInput } from '../interfaces/valuation';
import { calculateLoanEligibility } from '../../utils/loan';

export class VehicleService {
  private vehicleRepository = AppDataSource.getRepository(Vehicle);
  private valuationRepository = AppDataSource.getRepository(Valuation);
  private loanApplicationRepository = AppDataSource.getRepository(LoanApplication);
 
  async createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const vehicle = this.vehicleRepository.create(data);
      return this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new Error('Failed to create vehicle');
    }
  }

  async getVehicle(vin: string): Promise<Vehicle | null> {
    try{
      const vehicle = await this.vehicleRepository.findOneBy({ vin });
      if (!vehicle) {
        return null;
      }
      return vehicle;
    }catch(error){
      return null;
    }
  }

  async getAllVehicles(): Promise<Vehicle[] | null> {
    try {
      const vehicles = await this.vehicleRepository.find();
      if (vehicles.length == 0) {
        return null;
      }
      return vehicles;
    } catch (error) {
      return null;
    }
    // return this.vehicleRepository.find();
    // return this.vehicleRepository.find({ relations: ['valuations', 'loanApplications'] });
  }

  async deleteVehicle(vin: string): Promise<void> {
    try {
      const deleteVehicle = await this.vehicleRepository.delete({ vin });
      if (deleteVehicle.affected === 0) {
        return null;
      }
      return deleteVehicle[0];
    } catch (error) {
      return null
    }
  }

  async updateVehicle(vin: string, data: Partial<Vehicle>): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehicleRepository.findOneBy({ vin });
      if (!vehicle) {
        return null;
      }
      await this.vehicleRepository.update({ vin }, data);
      return this.getVehicle(vin);
    } catch (error) {
      return null;
    };
  }



  async vehicleValuation(vehicleId: number ): Promise<Valuation> {
    try {
  
      // Fetch vehicle by ID
      const vehicle = await this.vehicleRepository.findOneBy({ id: vehicleId });
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }
  
  
      // Prepare car input for valuation with type casting
      const carInput: CarValuationInput = {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        mileage: vehicle.mileage,
        condition: vehicle.condition,
        estimatedValue: vehicle.estimatedValue,
        features: Array.isArray(vehicle.features) ? vehicle.features : [vehicle.features],
      };
  
      // Calculate estimated value
      const estimatedValue = calculateCarValuation(carInput);
  
      // Create and save valuation record
      const valuation = this.valuationRepository.create({
        vehicle: vehicle,
        estimatedValue: estimatedValue,
      });
  
      // Save the valuation and return it
      return await this.valuationRepository.save(valuation);
    } catch (error) {
      throw new Error(`Failed to create vehicle valuation: ${error.message}`);
    }
  }  

  async getVehicleValuations(vin: string): Promise<Valuation[]> {
    try {
      const vehicle = await this.vehicleRepository.findOneBy({ vin });
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }
      return this.valuationRepository.find({ where: { vehicle: vehicle } });
    } catch (error) {
      throw new Error('Failed to get vehicle valuations');
    }
  }


  async getVehicleLoanApplications(vin: string): Promise<LoanApplication[]> {
    try{
    const vehicle = await this.vehicleRepository.findOne({
      where: { vin },
      relations: ['loanApplications'],
    });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle.loanApplications;
  }catch(error){
    throw new Error('Failed to get vehicle loan applications');
  }
}

async createLoanApplication(vin: string, loanApplication: Partial<LoanApplication>): Promise<LoanApplication> {
  try {
      const vehicle = await this.vehicleRepository.findOneBy({ vin });
      if (!vehicle) {
          throw new Error('Vehicle not found');
      }

      const vehicleWithArrayFeatures = {
          ...vehicle,
          features: Array.isArray(vehicle.features) ? vehicle.features : [vehicle.features],
      };

      const vehicleValue = vehicle.estimatedValue

      const { applicantIncome, applicantCreditScore, loanAmount, interestRate } = loanApplication;
      console.log(loanApplication)

      // if (!applicantIncome || !applicantCreditScore || !loanAmount) {
      //     throw new Error('Missing required loan application information');
      // }

      // Check if the loan application is eligible based on the criteria
      const isEligible = calculateLoanEligibility(
          applicantIncome,
          applicantCreditScore,
          loanAmount,
          vehicleValue,
          interestRate
      );
      console.log(isEligible)

      if (isEligible === false) {
          throw new Error('Loan application is not eligible based on the predefined criteria');
      }

      // Create a new loan application if eligible
      const newLoanApplication = this.loanApplicationRepository.create({
          ...loanApplication,
          vehicle: vehicle,
          eligibilityStatus: 'eligible',
      });

      return await this.loanApplicationRepository.save(newLoanApplication);
  } catch (error) {
      throw new Error(`Failed to create loan application: ${error.message}`);
  }
}}

