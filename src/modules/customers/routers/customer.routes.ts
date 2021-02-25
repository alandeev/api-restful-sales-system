import { errorsMessage } from '@config/celebrate.config';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CustomerControllers from '../controllers/CustomerControllers';

const customersRoutes = Router();

const customerControllers = new CustomerControllers();

customersRoutes.get('/', isAuthenticated, customerControllers.index);

customersRoutes.get(
  '/:customerId',
  celebrate({
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required().messages(errorsMessage)
    }
  }),
  isAuthenticated,
  customerControllers.get
);

customersRoutes.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4).max(40).required().messages(errorsMessage),
      email: Joi.string().email().min(8).max(50).required().messages(errorsMessage),
    },
  }),
  customerControllers.store
);

customersRoutes.delete(
  '/:customerId',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required().messages(errorsMessage),
    },
  }),
  customerControllers.delete
);

export default customersRoutes;
