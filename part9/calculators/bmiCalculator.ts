const calculateBmi = (height: number, weight: number): string => {
  if (height < 1) {
    throw new Error('Height cannot be less than 1')
  }

  // calculate the bmi
  const bmi = weight / (height * height * 0.0001)

  // underweight
  if (bmi < 18.5) {
    return 'Underweight'
  }
  
  // normal weight
  if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (Healthy weight)'
  }
  
  // over weight
  if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight'
  }

  // Obesity
  return 'Obesity'
}

export {
  calculateBmi,
};