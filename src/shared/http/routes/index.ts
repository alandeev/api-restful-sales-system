import { Router } from 'express';

import productsRouter from '@modules/routes/products.routes';
import usersRouter from '@modules/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
