import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

const app = express();

//settings
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333, () =>
  console.log(
    process.env.SERVER_PORT,
    `Server running in the port ${process.env.SERVER_PORT}`,
  ),
);
