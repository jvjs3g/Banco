import { Router} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentRouter = Router();


appointmentRouter.post('/', celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().min(11).max(11),
  }
}), appointmentsController.create);

export default appointmentRouter;
