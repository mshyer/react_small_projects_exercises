import express from 'express';


// import bodyParser from 'body-parser';
// const jsonParser = bodyParser.json();

import calculateExercises from './exerciseCalculator';
import calculateBmi from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack of Pancakes!');
});

app.get('/bmi', (req, res) => {

  // interface queries {
  //   weightKG: number,
  //   heightCM: number,
  // }
  console.log('res.query :>> ', req.query);
  const heightCM = Number(req.query.heightCM);
  const weightKG = Number(req.query.weightKG);
  if (heightCM && weightKG) {
    console.log('object :>> ', calculateBmi(heightCM, weightKG));
    res.send(calculateBmi(heightCM, weightKG));
  } else {
    res.status(400);
    res.send({
      error: "malformatted parameters",
    });
  }
  
});

function invalidDailyHours(dailyHours: number[]): boolean {
  console.log('dailyHours :>> ', dailyHours);
  return !dailyHours.every(entry => typeof entry === 'number');
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const {targetHours, dailyHoursRaw} = req.body;
  const dailyHours: number[] = (dailyHoursRaw as number[]).map(ele => Number(ele));

  if (!targetHours || isNaN(Number(targetHours))) {
    return res.status(400).send({error: "invalid target hours"});
  } else if (invalidDailyHours(dailyHours)) {
    return res.status(400).send({error: "invalid daily hours list"});
  }
  const result = calculateExercises(dailyHours, targetHours as number);
  return res.send({ result });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("Server running on port" + PORT);
});