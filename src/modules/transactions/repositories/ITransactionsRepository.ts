import Account from '../infra/typeorm/entities/Transaction';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionDTO';

export default interface ITransactionsRepository {
  findById(id:String): Promise<Account | undefined>;
  create(data : ICreateTransactionsDTO): Promise<Account>;
  save(account : Account): Promise<Account>;
 }
