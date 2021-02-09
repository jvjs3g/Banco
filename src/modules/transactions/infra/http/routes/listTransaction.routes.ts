import { Router,
} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';



import ListController from '../controllers/ListController';

const transactionsRouter = Router();

const listController = new ListController();

transactionsRouter.get('/',celebrate({
  [Segments.BODY]:{
    idAccount: Joi.string().required(),
  }
}), listController.show);

export default transactionsRouter;
