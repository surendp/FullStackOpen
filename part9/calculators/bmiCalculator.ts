interface HeightWeight {
  height: number;
  weight: number;
}

// read values from commandline and return
// in the from of @HeightWeight interface
const readCliArgs = (args: Array<string>): HeightWeight => {
  // throw error if the arguments are either less or more
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // extract height and weight
  const height = Number(args[2]);
  const weight = Number(args[3]);

  // check if the inputs are valid
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    };
  }

  // throw error if the inputs are invalid
  throw new Error('Invalid input!');
}

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

try {
  const { height, weight } = readCliArgs(process.argv);
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log(e.message)
}