import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  try {
    // format the height and weight provided by the user
    const { height, weight } = req.query;

    // if height and weight are missing throw error
    if (!height || !weight) {
      throw new Error('Please provide height and weight as query parameters');
    }

    const formattedHeight = Number(height);
    const formattedWeight = Number(weight);

    // check if the inputs are valid
    if (isNaN(formattedHeight) || isNaN(formattedWeight)) {  
      // throw error if the inputs are invalid
      throw new Error('malformatted parameters!');
    }
    
    // calculate bmi
    const bmi = calculateBmi(formattedHeight, formattedWeight);

    // send the bmi result
    res.json({
      weight,
      height,
      bmi
    })
  } catch (error) {
    // send the error message
    res.status(400).json({
      error: error.message,
    })
  }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
