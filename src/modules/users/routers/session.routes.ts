import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../controllers/session.controller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const sessionController = new SessionController();

const routes = Router();

routes.get('/', isAuthenticated, sessionController.oAuth)

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().min(8).max(80).required(),
      password: Joi.string().min(4).max(30).required(),
    }
  }),
  sessionController.authorize
);

export default routes;
