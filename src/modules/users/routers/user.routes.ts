import multer from 'multer';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { uploadConfig } from "@config/upload.config";

import UserController from '../controllers/user.controller';
import UploadController from '@modules/users/controllers/upload.controller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userController = new UserController();
const uploadController = new UploadController();

const upload = multer(uploadConfig);

const routes = Router();

//create user
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4).max(20).required(),
      email: Joi.string().email().min(8).max(80).required(),
      password: Joi.string().min(4).max(30).required(),
    }
  }),
  userController.create
);

//set user avatar
routes.put('/avatar', isAuthenticated, upload.single('file'), uploadController.setUserAvatar);

export default routes;
