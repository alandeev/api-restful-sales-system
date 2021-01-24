import { Router } from 'express';

import productsRouter from '@modules/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
