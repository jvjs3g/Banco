import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionsService';

export default class TransactionController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createTransaction = container.resolve(CreateTransactionService);

      const { idAccount,  title, value , type }  = request.body;


      const transaction = await createTransaction.execute({
        idAccount,
        type,
        title,
        value,
      });

      return response.json(classToClass(transaction));
  }
}
