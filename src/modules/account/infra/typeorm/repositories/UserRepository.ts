import { getRepository, Repository, Not } from 'typeorm';

import IAccountRepository from "@modules/account/repositories/IAccountRepository";

import Account from '../entities/Account';

import ICreateAccountDTO from '@modules/account/dtos/ICreateAccountDTO';


class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor(){
    this.ormRepository = getRepository(Account);
  }

  public async findById(id:string):Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: {id}
    });

    return account;
  }


  public async findByCpf(cpf:string):Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: { cpf }
    });

    return account;
  }



  public async create({ cpf }: ICreateAccountDTO): Promise<Account>{
    const account = this.ormRepository.create({
      cpf,
    });

    await this.ormRepository.save(account);

    return account;
  }

  public async save(account: Account): Promise<Account>{
    return this.ormRepository.save(account);
  }
}

export default AccountRepository;
