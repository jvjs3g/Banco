import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFinadAllProvider from '../dtos/IFindAllProviderDTO';

export default interface IUsersRepository {
  findAllProviders(data:IFinadAllProvider): Promise<User[]>;
  findById(id:String): Promise<User | undefined>;
  findByEmail(email:String): Promise<User | undefined>;
  findByCpf(cpf:string): Promise<User | undefined>;
  findByRg(rg:string): Promise<User | undefined>;
  create(data : ICreateUserDTO): Promise<User>;
  save(user : User): Promise<User>;
 }
