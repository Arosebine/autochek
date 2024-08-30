import { Vehicle } from "../entities/vehicle.entity";

interface LoanApplication {
    applicantIncome: number;
    applicantCreditScore: number;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    vehicle?: Vehicle;
    eligibilityStatus?: 'eligible' | 'ineligible';
  }