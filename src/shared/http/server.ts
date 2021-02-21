import 'reflect-metadata';
import '@shared/typeorm';
import 'express-async-errors'; // error
import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';

import routes from './routers';
import HttpException from '@shared/errors/HttpException';
import { resolve } from 'path';
import { uploadConfig } from '@config/upload.config';

const app = express();

app.use(express.static(uploadConfig.dest));
app.use(express.json());

//routes
app.use('/', routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof HttpException) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.log({ error: error.message });

  return response.status(500).json({
    statusCode: "error",
    message: "Ocorreu um problema interno no servidor"
  })
})


app.listen(3000, () => console.log(`Server running in the port 3000`));
