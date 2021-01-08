import { getRepository, Repository,  Raw } from 'typeorm';

import IAppointmentRepository from "@modules/account/repositories/IAppintmentRepository";

import Appointment from '../entities/Appointment';

import ICreateAccountDTO from '@modules/account/dtos/ICreatAccountDTO';


// Data transfer object

class AppointmentsRepository  implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

   public async findByCpf(cpf: string): Promise<Appointment | undefined> {
    const user = this.ormRepository.findOne({
      where: { cpf }
    });

    return user;
  }


  public async create({ cpf }: ICreateAccountDTO): Promise<Appointment>{

    const appointment = this.ormRepository.create({
      cpf,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
