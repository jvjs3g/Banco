import { injectable, inject } from 'tsyringe';

import { startOfHour, isBefore , getHours, format } from 'date-fns';
import Appointment from "../infra/typeorm/entities/Appointment";
import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '../repositories/IAppintmentRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest{
  user_id: string;
  provider_id:string;
  date:Date;
}

@injectable()
class CreateAppointmentService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    @inject('NotificationsRepository')
    private notificationsRepository:INotificationRepository,
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ){

  }

  public async  execute({date, provider_id, user_id }: IRequest): Promise<Appointment>{

  const appointmentDate = startOfHour(date);

  if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create an appointment on a past date.");
  }

  if(user_id == provider_id ){
    throw new AppError("You can't create appointment with yourself");
  }

  if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
    throw new AppError('You can only create appointments between 8am and 5pm.');
  }

  const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

  if(findAppointmentInSameDate){
    throw new AppError('This appointment is already booked');

  }//

   const appointment = await this.appointmentRepository.create({
    date:appointmentDate,
    provider_id,
    user_id
  });


  const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

  await this.notificationsRepository.create({
    recipient_id: provider_id,
    content: `Novo agendamento para dia ${dateFormatted}`,
  });

  await this.cacheProvider.invalidate(
    `provider-appointment:${provider_id}:${format(appointmentDate, 'YYYY-M-d')}`,
  )

  return appointment;
  }
}


export default CreateAppointmentService;
