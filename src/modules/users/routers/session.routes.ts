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

//recorery password by email
routes.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().min(8).max(80).required()
    }
  }),
  sessionController.recovery
);

//change password by token
routes.post(
  '/changepwd',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      new_password: Joi.string().min(4).max(30).required()
    }
  }),
  sessionController.changepwd
);

export default routes;
