import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
 interface Request {
   idAccount: string;
 }

 interface Balance {
  transaction:Transaction[];
  entrada: number;
  saida: number;
  total: number;
}

@injectable()
class ListTransactionService{
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository:ITransactionsRepository,
    ){

  }
  public async execute({idAccount}:Request):Promise<Balance | undefined>{
    const balance = await this.transactionsRepository.list(idAccount);

    return balance;
  }
}//

export default ListTransactionService;
