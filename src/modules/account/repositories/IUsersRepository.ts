import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateAccountDTO';

export default interface IUsersRepository {
  findById(id:String): Promise<User | undefined>;
  findByEmail(email:String): Promise<User | undefined>;
  findByCpf(cpf:string): Promise<User | undefined>;
  findByRg(rg:string): Promise<User | undefined>;
  create(data : ICreateUserDTO): Promise<User>;
  save(user : User): Promise<User>;
 }
