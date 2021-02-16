import { getRepository, Repository } from 'typeorm';

import IAccountRepository from "@modules/accounts/repositories/IAccountsRepository";

import Account from '../entities/Account';

import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';


class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor(){
    this.ormRepository = getRepository(Account);
  }

  public async findById(id: string): Promise<Account | undefined>{
    const account = await this.ormRepository.findOne(id);

    return account;
  }

  public async findByCpf(cpf:string):Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: { cpf }
    });

    return account;
  }

  public async findByAgencia(agencia:string):Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: { agencia }
    });

    return account;
  }

   public async findByConta(conta:string):Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: { conta }
    });

    return account;
  }



  public async create({ cpf, agencia, conta }: ICreateAccountDTO): Promise<Account>{
    const appointment = this.ormRepository.create({
      cpf,
      agencia,
      conta
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(account: Account): Promise<Account>{
    return this.ormRepository.save(account);
  }
}

export default AccountRepository;
