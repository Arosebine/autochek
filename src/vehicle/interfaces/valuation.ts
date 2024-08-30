import { Vehicle } from "../entities/vehicle.entity";

export interface Valuation {
    vehicle: Vehicle;
    valuationDate: Date;
    estimatedValue: number;
  }

export interface CarValuationInput {
    make: string;
    model: string;
    year: number;
    mileage: number;
    condition: string;
    estimatedValue: number;
    features: string[];
  }