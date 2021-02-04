import { Router,
} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';



import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();

const transactionController = new TransactionsController();

transactionsRouter.post('/',celebrate({
  [Segments.BODY]:{
    idAccount: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    value: Joi.number().required(),
  }
}), transactionController.create);

export default transactionsRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
