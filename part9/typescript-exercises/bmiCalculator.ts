export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.4 && bmi < 25.0) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25.0 && bmi < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 29.9 && bmi < 34.9) {
    return "Obese (Class I)";
  } else if (bmi >= 34.9 && bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};
