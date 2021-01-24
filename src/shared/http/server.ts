import 'reflect-metadata';
import '@shared/typeorm';
import express, { Request, Response } from 'express';
import 'express-async-errors'; // necessário para tratamento errors.
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

//settings
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

//midleware error
app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log(process.env.SERVER_PORT, `Server running in the port ${process.env.SERVER_PORT}`));
