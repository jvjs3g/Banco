import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreatAccountDTO';

export default interface IAppointmentsRepository {
  create( data : ICreateAppointmentDTO): Promise<Appointment>;
  findByCpf(cpf: string ): Promise< Appointment | undefined >;

}
