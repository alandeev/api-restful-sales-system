import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '@modules/users/controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticate';

const usersRouter = Router();
const usersController = new UsersController();

// get users
usersRouter.get('/', isAuthenticated, usersController.index);

// create user
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
