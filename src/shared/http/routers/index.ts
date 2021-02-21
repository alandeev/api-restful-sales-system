import { Router } from 'express';

import userRoutes from '@modules/users/routers/user.routes';
import sessionRoutes from '@modules/users/routers/session.routes';
import passwordRoutes from '@modules/users/routers/password.routes';

const routes = Router();


routes.use('/sessions', sessionRoutes)
routes.use('/users', userRoutes);
routes.use('/password', passwordRoutes);

export default routes;
