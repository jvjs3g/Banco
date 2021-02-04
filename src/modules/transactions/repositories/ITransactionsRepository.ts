import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionDTO';

export default interface ITransactionsRepository {
  findById(id:String): Promise<Transaction | undefined>;
  create(data : ICreateTransactionsDTO): Promise<Transaction>;
  save(transaction : Transaction): Promise<Transaction>;
 }
