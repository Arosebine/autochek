import { LoanApplication } from "../vehicle/entities/loanApplication.entity";
import { Vehicle } from "../vehicle/interfaces/vehicles";

function checkLoanEligibility(loanApplication: Partial<LoanApplication>, vehicle: Vehicle): boolean {
    const { applicantIncome, applicantCreditScore, loanAmount } = loanApplication;
  
    if (!applicantIncome || !applicantCreditScore || !loanAmount) {
      return false; // Missing critical information
    }
  
    // Basic eligibility criteria
    const minIncome = 20000; // Minimum income required
    const minCreditScore = 600; // Minimum credit score required
    const maxLoanToValueRatio = 0.8; // Max loan amount should not exceed 80% of vehicle value
  
    // Calculate the loan-to-value (LTV) ratio
    const loanToValueRatio = loanAmount / vehicle.estimatedValue;
  
    return (
      applicantIncome >= minIncome &&
      applicantCreditScore >= minCreditScore &&
      loanToValueRatio <= maxLoanToValueRatio
    );
  }

  export default checkLoanEligibility;