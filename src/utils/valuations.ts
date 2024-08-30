
interface CarValuationInput {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  estimatedValue: number;
  features: string[];
}

function calculateCarValuation(input: CarValuationInput): number {
  let baseValue = input.estimatedValue;

  // Depreciate value based on the age of the car
  const currentYear = new Date().getFullYear();
  const age = currentYear - input.year;
  const depreciationRate = 0.05; // 5% per year depreciation
  const ageDepreciation = age * depreciationRate;

  baseValue -= baseValue * ageDepreciation;

  // Decrease value based on mileage
  const mileageDepreciationRate = 0.02; // 2% per 10,000 miles
  const mileageFactor = input.mileage / 10000;
  const mileageDepreciation = mileageFactor * mileageDepreciationRate;

  baseValue -= baseValue * mileageDepreciation;

  type CarCondition = 'excellent' | 'good' | 'fair' | 'poor';
  // Adjust value based on condition
  const conditionFactors: { [key in CarCondition]: number } = {
    excellent: 1.2, // 20% increase
    good: 1.0,      // no change
    fair: 0.8,      // 20% decrease
    poor: 0.6,      // 40% decrease
  };

  // Ensure condition is one of the valid CarCondition values
  const conditionFactor = conditionFactors[input.condition];
  baseValue *= conditionFactor;

  // Adjust value based on additional features
  const featureValueMap: { [key: string]: number } = {
    sunroof: 500,
    navigation: 1000,
    leatherSeats: 1500,
    heatedSeats: 800,
    premiumSound: 600 
  };

  let featuresValue = 0;
  for (const feature of input.features) {
    if (featureValueMap.hasOwnProperty(feature)) {
      featuresValue += featureValueMap[feature];
    }
  }

  baseValue += featuresValue;

  return Math.max(baseValue, 0); // Ensure the value doesn't drop below 0
}

export default calculateCarValuation;
// // e.g 
// const carInput: CarValuationInput = {
//   make: 'Toyota',
//   model: 'Camry',
//   year: 2018,
//   mileage: 30000,
//   condition: 'good',
//   estimatedValue: 20,
//   features: ['sunroof', 'leatherSeats'],
// };

// const value = calculateCarValuation(carInput);
// console.log(`Estimated value: $${value.toFixed(2)}`);

