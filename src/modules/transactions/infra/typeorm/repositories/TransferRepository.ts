import { getRepository, Repository } from 'typeorm';

import ITransferRepository from "@modules/transactions/repositories/ITransferRepository";

import Account from '@modules/accounts/infra/typeorm/entities/Account';

import Transaction from '../entities/Transaction';

import ICreateTransferDTO from '@modules/transactions/dtos/ICreatetransferDTO';


class TransferRepository implements ITransferRepository {
  private ormRepository: Repository<Transaction>;
  private accountRepository: Repository<Account>;

  constructor(){
    this.ormRepository = getRepository(Transaction);
    this.accountRepository = getRepository(Account);
  }

 public async findByAccount(conta: string): Promise<Account[]> {
   const account  = await  this.accountRepository.find({
     where: {
       conta,
     }
   });

   return account;
 }


  public async create({ idAccount, title, type, value  }: ICreateTransferDTO): Promise<Transaction>{
    const appointment = this.ormRepository.create({
      idAccount,
      title,
      type,
      value
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(Transaction: Transaction): Promise<Transaction>{
    return this.ormRepository.save(Transaction);
  }
}

export default TransferRepository;
