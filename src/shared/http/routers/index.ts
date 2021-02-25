import { Router } from 'express';

import userRoutes from '@modules/users/routers/user.routes';
import sessionRoutes from '@modules/users/routers/session.routes';
import passwordRoutes from '@modules/users/routers/password.routes';
import customersRoutes from '@modules/customers/routers/customer.routes';
import productsRoutes from '@modules/products/routes/products.routes';
import ordersRoutes from '@modules/orders/routers/orders.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes)
routes.use('/users', userRoutes);
routes.use('/password', passwordRoutes);
routes.use('/products', productsRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
