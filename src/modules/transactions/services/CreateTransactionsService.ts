import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface Request{
  idAccount:string;
  title: string;
  type: string;
  value: number;
}

@injectable()
class CreateTransactionService{
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository:ITransactionsRepository,
    ){

  }
  public async execute({ idAccount, title, type, value}:Request):Promise<Transaction>{



    const transaction = await this.transactionsRepository.create({
       idAccount,
       title,
       type,
       value
    });

    return transaction;
  }
}//

export default CreateTransactionService;
