import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import Account from '../infra/typeorm/entities/Account';
import IAccountRepository from '../repositories/IAccountRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request{
  cpf: string;
}

@injectable()
class CreateAccountService{
  constructor(
    @inject('AccountsRepository')
    private accountsRepository:IAccountRepository,

    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ){

  }
  public async execute({ cpf }:Request):Promise<Account>{



    const checkCpfExists = await this.accountsRepository.findByCpf(cpf);

    if(checkCpfExists){
      throw new AppError('CPF already exists');
    }



    const user = await this.accountsRepository.create({
      cpf,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}//

export default CreateAccountService;
