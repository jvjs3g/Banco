import Account from '@modules/accounts/infra/typeorm/entities/Account';
import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransferDTO from '../dtos/ICreatetransferDTO';



export default interface ITransactionsRepository {
  findByAccount(conta:string): Promise<Account[]>;
  create(data : ICreateTransferDTO): Promise<Transaction>;
  save(transaction : Transaction): Promise<Transaction>;
 }
