import express from 'express';

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import calculator, {Operation} from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('ping pong');
});

app.post('/calculate', jsonParser, (req, res) => {
  // console.log('req.body :>> ', req);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = req.body;

  // console.log('req.body :>> ', req.body);

  if ( !value1 || isNaN(Number(value1)) ) {
    return res.status(400).send({ error: 'invalid height'});
  } else if ( !value2 || isNaN(Number(value2)) ) {
    return res.status(400).send({ error: 'invalid weight'});
  } else if (!['multiply', 'add', 'divide'].includes(op as string)) {
    return res.status(400).send({ error: 'invalid weight'});
  }
  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server running on port' + PORT);
});