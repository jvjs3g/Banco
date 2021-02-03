import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import Account from '../infra/typeorm/entities/Transaction';
import IUserRepository from '../repositories/ITransactionsRepository';

interface Request{
  cpf: string;
  agencia: string;
  conta: string;
}

@injectable()
class CreateAccountService{
  constructor(
    @inject('AccountsRepository')
    private accountsRepository:IUserRepository,
    ){

  }
  public async execute({ cpf , conta,  agencia}:Request):Promise<Account>{


    const checkCpfExists = await this.accountsRepository.findByCpf(cpf);

    if(checkCpfExists){
      throw new AppError('CPF already exists');
    }



    const account = await this.accountsRepository.create({
      cpf,
      agencia,
      conta
    });

    return account;
  }
}//

export default CreateAccountService;
