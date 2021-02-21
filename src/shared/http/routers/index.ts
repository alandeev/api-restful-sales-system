import { Router } from 'express';

import userRoutes from '@modules/users/routers/user.routes';
import sessionRoutes from '@modules/users/routers/session.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes)
routes.use('/users', userRoutes);

export default routes;