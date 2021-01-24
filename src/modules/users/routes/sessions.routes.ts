import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '@modules/users/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// session user authenticate
sessionsRouter.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.authenticate,
);

export default sessionsRouter;
