import { Router,
} from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/',celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cpf: Joi.string().required().min(11).max(11),
    rg: Joi.string().required(),
    nascimento: Joi.date().required(),
    nomeDaMae: Joi.string().required(),
    cep: Joi.string().required().min(8).max(8),
    numero: Joi.string().required(),
    complemento: Joi.string(),
    rua: Joi.string().required()
  }
}), userController.create);

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'), userAvatarController.update);
export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
