import { Router,
} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import AccountsController from '../controllers/AccountsController';

const usersRouter = Router();


const accountController = new AccountsController();

usersRouter.post('/',celebrate({
  [Segments.BODY]:{
    cpf: Joi.string().required().min(11).max(11),
  }
}), accountController.create);

export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
