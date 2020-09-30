interface Result {
  average: number;
  periodLength: number;
  rating: number;
  ratingDescription: string;
  success: boolean;
  target: number;
  trainingDays: number;
}

interface Inputs {
  targetValue: number;
  exerciseHours: Array<number>;
}

type RatingValues = 1 | 2 | 3;

// calculate average
const calculateAverage = (dailyExerciseHours: Array<number>): number => {
  // callback function for reduce method
  const sumFn = (
    accumulator: number,
    currentValue: number
  ): number => accumulator + currentValue;

  // return the average
  return dailyExerciseHours.reduce(sumFn) / dailyExerciseHours.length;
}

// calculate rating
const calculateRating = (average: number, target: number): RatingValues => {
  const ratingReference: number = average / target;

  if (ratingReference <= 0.5) {
    return 1;
  }

  if (ratingReference >= 1) {
    return 3;
  }

  return 2;
}

// rating description
const calculateRatingDescription = (rating: RatingValues): string => {
  let description = 'Need to work hard';

  switch (rating) {
    case 3:
      description = 'Excellent Work';
      break;
    
    case 2:
      description = 'not too bad but could be better';
      break;
    
    default:
      break;      
  }

  return description
}

// number of training days attended
const calculateTrainingDays = (dailyExerciseHours: Array<number>): number => {
  // callback function for filter method
  const filterCallback = (hour: number) => hour > 0

  // return the number of training days
  return dailyExerciseHours.filter(filterCallback).length
}

// extract the cli arguments
const getCliArgs = (args: Array<string>): Inputs => {
  // throw error if the arguments are either less or more
  if (args.length < 4) throw new Error('Not enough arguments');

  // extract targetValue and exercise hours
  const targetValue = Number(args[2]);
  const exerciseHours = args
    .slice(3)
    .map(h => Number(h));

  // return valid data
  if (!isNaN(targetValue) && !exerciseHours.includes(NaN)) {
    return {
      targetValue,
      exerciseHours
    }
  }

  // throw invalid input error
  throw new Error('All inputs should be numbers')
}

// exercise calculator 
const exerciseCalculator = (dailyExerciseHours: Array<number>, target: number): Result => {
  const average: number =  calculateAverage(dailyExerciseHours);
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = calculateTrainingDays(dailyExerciseHours);
  const success: boolean = average > target;
  const rating: RatingValues = calculateRating(average, target);
  const ratingDescription: string = calculateRatingDescription(rating);

  return {
    average,
    periodLength,
    rating,
    ratingDescription,
    success,
    target,
    trainingDays,
  }
}

try {
  const { targetValue, exerciseHours } = getCliArgs(process.argv)
  console.log(exerciseCalculator(exerciseHours, targetValue))
} catch (error) {
  console.log(error.message)
}