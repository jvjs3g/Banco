import { getRepository, Repository } from 'typeorm';

import ITransactionRepository from "@modules/transactions/repositories/ITransactionsRepository";

import Transaction from '../entities/Transaction';

import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';


interface Balance {
  transaction:Transaction[];
  entrada: number;
  saida: number;
  total: number;
}

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor(){
    this.ormRepository = getRepository(Transaction);
  }

  public async findById(id: string): Promise<Transaction | undefined>{
    const transaction = await this.ormRepository.findOne(id);

    return transaction;
  }


  public async list(idAccount: string):Promise<Balance>{

    const transaction = await this.ormRepository.find({
      where:{ idAccount }
    });

    const entrada  = await this.getValue('Entrada');
    const saida = await this.getValue('Saida');

    const total = entrada - saida;


    return { transaction, entrada, saida, total };
  }

  private async getValue(type: string): Promise<number> {
    const { result } = await this.ormRepository.createQueryBuilder("transaction")
        .select('SUM(transaction.value)', 'result')
        .where('type = :type', { type })
        .getRawOne();

    return Number(result);
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
