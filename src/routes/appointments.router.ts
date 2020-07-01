import { Router} from 'express';
import { getCustomRepository } from 'typeorm';
import {  parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
const appointmentRouter = Router();

appointmentRouter.get('/', async  (request,response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
})


appointmentRouter.post('/', async  (request,response) => {
  try{

  const { provider , date } = request.body;

  const parseDate = parseISO(date);
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ provider,date:parseDate});

  return response.json(appointment);

  }catch(err){
    return response.status(400).json({ error: err.message });
  }

});
export default appointmentRouter;
