import { Router,
} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import TransferController from '../controllers/TransferController';

const transferRouter = Router();
const usersRouter = Router();

const transferController = new TransferController();

usersRouter.use(ensureAuthenticated);

transferRouter.post('/',celebrate({
  [Segments.BODY]:{
    agencia: Joi.string().required(),
    conta: Joi.string().required(),
    title: Joi.string().required(),
    value: Joi.number().required(),
  }
}), transferController.create);

export default transferRouter;
