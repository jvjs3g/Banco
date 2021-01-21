import Account from '../infra/typeorm/entities/Account';
import ICreateAccountDTO from '../dtos/ICreateAccountDTO';

export default interface IAccountsRepository {
  findById(id:String): Promise<Account | undefined>;
  findByCpf(cpf:string): Promise<Account | undefined>;
  create(data : ICreateAccountDTO): Promise<Account>;
  save(account : Account): Promise<Account>;
 }
