import { errorsMessage } from '@config/celebrate.config';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OrdersControllers from '../controllers/OrdersControllers';

const ordersRoutes = Router();

const ordersControllers = new OrdersControllers();

ordersRoutes.get(
  '/',
  isAuthenticated,
  ordersControllers.index
);

ordersRoutes.get(
  '/:order_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required().messages(errorsMessage)
    },
  }),
  ordersControllers.show
);

ordersRoutes.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required().messages(errorsMessage),
      products: Joi.array().required(),
    },
  }),
  ordersControllers.store
);

export default ordersRoutes;
