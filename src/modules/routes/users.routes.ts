import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '@modules/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// get users
usersRouter.get('/', usersController.index);

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

//get user by id
usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

//delete user by id
usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

export default usersRouter;
