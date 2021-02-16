import { getRepository, Repository } from 'typeorm';

import ITransferRepository from "@modules/transactions/repositories/ITransferRepository";

import Account from '@modules/accounts/infra/typeorm/entities/Account';

import Transaction from '../entities/Transaction';

import ICreateTransferDTO from '@modules/transactions/dtos/ICreatetransferDTO';

interface Balance {
  transaction:Transaction[];
  entrada: number;
  saida: number;
  total: number;
}


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


 public async getBalance(idAccount: string):Promise<Balance>{

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
///


  public async save(Transaction: Transaction): Promise<Transaction>{
    return this.ormRepository.save(Transaction);
  }
}

export default TransferRepository;
