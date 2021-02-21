import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const forgotPasswordController = new ForgotPasswordController();

const passwordRoutes = Router();

//recorery password by email
passwordRoutes.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      new_password: Joi.string().min(4).max(30).required(),
    },
  }),
  forgotPasswordController.recovery
);

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().min(8).max(80).required()
    },
  }),
  forgotPasswordController.create
);


export default passwordRoutes;
