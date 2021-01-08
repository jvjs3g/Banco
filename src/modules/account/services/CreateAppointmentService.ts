import { injectable, inject } from 'tsyringe';

import { startOfHour, isBefore , getHours, format } from 'date-fns';
import Appointment from "../infra/typeorm/entities/Appointment";
import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '../repositories/IAppintmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest{
  cpf:string;
}

@injectable()
class CreateAppointmentService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ){

  }

  public async  execute({cpf }: IRequest): Promise<Appointment>{

    const ifCpfExists = this.appointmentRepository.findByCpf(cpf);

    if(ifCpfExists){
      throw new AppError('Já existe uma conta nesse CPF');
    }

   const appointment = await this.appointmentRepository.create({
    cpf
  });


  return appointment;
  }
}


export default CreateAppointmentService;
