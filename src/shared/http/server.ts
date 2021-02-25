import 'reflect-metadata';
import '@shared/typeorm';
import 'express-async-errors'; // error
import express from 'express';

import routes from './routers';
import { uploadConfig } from '@config/upload.config';
import middlewareException from '@shared/errors/MiddlewareException';

const app = express();

app.use(express.static(uploadConfig.dest));
app.use(express.json());

//routes
app.use('/', routes);
app.use(middlewareException);


app.listen(3333, () => console.log(`Server running in the port 3333`));
