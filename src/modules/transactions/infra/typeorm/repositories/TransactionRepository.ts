import { getRepository, Repository } from 'typeorm';

import ITransactionRepository from "@modules/transactions/repositories/ITransactionsRepository";

import Transaction from '../entities/Transaction';

import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';


class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor(){
    this.ormRepository = getRepository(Transaction);
  }

  public async findById(id: string): Promise<Transaction | undefined>{
    const transaction = await this.ormRepository.findOne(id);

    return transaction;
  }


  public async create({ idAccount, title, type, value  }: ICreateTransactionDTO): Promise<Transaction>{
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

export default TransactionRepository;
