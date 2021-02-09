import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListTransactionService from '@modules/transactions/services/ListTransactionsService';

export default class ListController {
  public async show(request: Request ,response: Response ): Promise<Response>{

      const listTransaction = container.resolve(ListTransactionService);

      const { idAccount }  = request.body;


      const transaction = await listTransaction.execute({
        idAccount,
      });

      return response.json(classToClass(transaction));
  }
}
