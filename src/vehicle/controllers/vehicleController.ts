import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicleService';

const vehicleService = new VehicleService();

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { vin, make, model, year, mileage, condition, estimatedValue, features } = req.body;
    const vehicleBody = {
      vin,
      make,
      model,
      year,
      mileage,
      condition,
      estimatedValue,
      features,
    };
    const vehicle = await vehicleService.createVehicle(vehicleBody);
    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vin = req.params.vin;
    const vehicle = await vehicleService.getVehicle(vin);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    if (vehicles === null) {
      return res.status(404).json({ message: 'No vehicles found' });
    }
    return res.json(vehicles);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vin = req.params.vin;
    const { make, model, year, mileage } = req.body;
    const vehicle = await vehicleService.updateVehicle(vin, { make, model, year, mileage });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vin = req.params.vin;
    const result = await vehicleService.deleteVehicle(vin);
    if (result === null) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.status(200).json({ message: 'Vehicle deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const vehicleValuation = async (req: Request, res: Response) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId, 10);
    const { valuationDate } = req.body;
    const valuation = await vehicleService.vehicleValuation(vehicleId);
    return res.status(201).json(valuation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getVehicleValuations = async (req: Request, res: Response) => {
  try {
    const { vin } = req.params;
    const valuations = await vehicleService.getVehicleValuations(vin);
    return res.status(200).json(valuations);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const createLoan = async(req: Request, res: Response )=>{
  try{
    const { vin } = req.params;
    const { applicantName, applicantIncome, loanAmount,} = req.body;
    const loanApplication = {
      applicantName, applicantIncome, loanAmount,
    }
    const createLoan = await vehicleService.createLoanApplication(vin, loanApplication)
    return res.status(201).json({ message: "Loan created succuessfully", createLoan })
  }catch(error){
    return res.status(500).json({ message: "Eror creating loan application", error: error.message})
  }
}



export const getLoanApplication = async (req: Request, res: Response) => {
  try {
    const { vin } = req.params;
    const loanApplication = await vehicleService.getVehicleLoanApplications(vin);
    if (!loanApplication) {
      return res.status(404).json({ message: 'Loan application not found' });
    }
    return res.status(200).json(loanApplication);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};