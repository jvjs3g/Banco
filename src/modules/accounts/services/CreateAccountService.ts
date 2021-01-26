import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import Account from '../infra/typeorm/entities/Account';
import IUserRepository from '../repositories/IAccountsRepository';

interface Request{
  cpf: string;
}

@injectable()
class CreateAccountService{
  constructor(
    @inject('AccountsRepository')
    private accountsRepository:IUserRepository,
    ){

  }
  public async execute({ cpf }:Request):Promise<Account>{


    const checkCpfExists = await this.accountsRepository.findByCpf(cpf);

    if(checkCpfExists){
      throw new AppError('CPF already exists');
    }



    const account = await this.accountsRepository.create({
      cpf,
    });

    return account;
  }
}//

export default CreateAccountService;
