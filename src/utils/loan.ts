export const calculateLoanEligibility = (
  applicantIncome: number,
  applicantCreditScore: number,
  loanAmount: number,
  vehicleValue: number,
  interestRate: number // Adding interest rate as a parameter
): boolean => {
  // Define basic eligibility criteria
  const minIncome = 20000; // Minimum income required
  const minCreditScore = 600; // Minimum credit score required
  const maxLoanToValueRatio = 0.8; // Max loan amount should not exceed 80% of vehicle value
  const maxDebtToIncomeRatio = 0.4; // Max debt-to-income ratio for eligibility

  // Calculate the loan-to-value (LTV) ratio
  const loanToValueRatio = loanAmount / vehicleValue;

  // Calculate the annual payment (simple calculation for demonstration; could be more complex in reality)
  const totalLoanCost = loanAmount * (1 + interestRate); // Total cost of loan with interest
  const annualPayment = totalLoanCost / 5; // Assuming a 5-year loan term

  // Calculate the debt-to-income ratio
  const debtToIncomeRatio = annualPayment / applicantIncome;

  // // Debugging: Log the calculated values and input parameters
  // console.log('Applicant Income:', applicantIncome);
  // console.log('Applicant Credit Score:', applicantCreditScore);
  // console.log('Loan Amount:', loanAmount);
  // console.log('Vehicle Value:', vehicleValue);
  // console.log('Interest Rate:', interestRate);
  // console.log('Loan-to-Value Ratio:', loanToValueRatio);
  // console.log('Debt-to-Income Ratio:', debtToIncomeRatio);
  // console.log('Minimum Income Required:', minIncome);
  // console.log('Minimum Credit Score Required:', minCreditScore);
  // console.log('Maximum Loan-to-Value Ratio:', maxLoanToValueRatio);
  // console.log('Maximum Debt-to-Income Ratio:', maxDebtToIncomeRatio);

  // Check eligibility
  const isEligible = 
    applicantIncome >= minIncome &&
    applicantCreditScore >= minCreditScore &&
    loanToValueRatio <= maxLoanToValueRatio &&
    debtToIncomeRatio <= maxDebtToIncomeRatio;

  // console.log('Eligibility Result:', isEligible); // Log the final eligibility result
  return isEligible;
};
