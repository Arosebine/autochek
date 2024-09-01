export const calculateLoanEligibility = (
  applicantIncome: number,
  applicantCreditScore: number,
  loanAmount: number,
  vehicleValue: number,
): boolean => {
  // Define basic eligibility criteria
  const minIncome = 20000; // Minimum income required
  const minCreditScore = 600; // Minimum credit score required
  const maxLoanToValueRatio = 0.8; // Max loan amount should not exceed 80% of vehicle value

  // Calculate the loan-to-value (LTV) ratio
  const loanToValueRatio = loanAmount / vehicleValue;

  // Check eligibility
  const isEligible =
    applicantIncome >= minIncome &&
    applicantCreditScore >= minCreditScore &&
    loanToValueRatio <= maxLoanToValueRatio;

  // console.log('Eligibility Result:', isEligible); // Log the final eligibility result
  return isEligible;
};