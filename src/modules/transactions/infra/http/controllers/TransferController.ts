import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateTransferService from '@modules/transactions/services/TransferService';

export default class TransferController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createTransfer = container.resolve(CreateTransferService);

      const { agencia , conta ,  title, value , type }  = request.body;


      const transfer = await createTransfer.execute({
        agencia,
        conta,
        type:'Entrada',
        title,
        value,
      });

      return response.json(classToClass(transfer));
  }
}
