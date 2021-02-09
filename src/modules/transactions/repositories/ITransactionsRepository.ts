import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionDTO';


interface Balance {
  transaction:Transaction[];
  entrada: number;
  saida: number;
  total: number;
}

export default interface ITransactionsRepository {
  findById(id:String): Promise<Transaction | undefined>;
  list(idAccount:string): Promise<Balance | undefined>;
  create(data : ICreateTransactionsDTO): Promise<Transaction>;
  save(transaction : Transaction): Promise<Transaction>;
 }
