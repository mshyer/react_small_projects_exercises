import express from 'express';
import apiRouter from './routes/api';

const cors = require('cors');

const baseUrl = '/api';

const app = express();
app.use(cors());
app.use(express.json());
app.use(baseUrl, apiRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});