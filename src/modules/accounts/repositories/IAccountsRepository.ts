import Account from '../infra/typeorm/entities/Account';
import ICreateAccountDTO from '../dtos/ICreateAccountDTO';

export default interface IUsersRepository {
  findById(id:String): Promise<Account | undefined>;
  findByCpf(cpf:string): Promise<Account | undefined>;
  findByConta(conta:string): Promise<Account | undefined>;
  findByAgencia(agencia:string): Promise<Account | undefined>;
  create(data : ICreateAccountDTO): Promise<Account>;
  save(account : Account): Promise<Account>;
 }
