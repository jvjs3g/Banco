import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

interface Request{
  idAccount: string;
  agencia:string;
  conta: string;
  title: string;
  type: string;
  value: number;
}

@injectable()
class CreateTransactionService{
  constructor(
    @inject('AccountsRepository')
    private accountsRepository:IAccountRepository,
    @inject('TransactionsRepository')
    private transactionsRepository:ITransactionsRepository,
    ){

  }
  public async execute({ idAccount,  agencia, conta, title, type, value}:Request):Promise<Transaction>{



    const ag = await this.accountsRepository.findByAgencia(agencia);

    const ac = await this.accountsRepository.findByConta(conta);

    if(ac){

    }

    if(!(ag?.id === ac?.id)){
      throw new AppError('Account not fount.');
    }


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
