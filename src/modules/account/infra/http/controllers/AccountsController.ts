import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAccountService from '@modules/account/services/CreateAccountService';


export default class AccountsController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createAccount = container.resolve(CreateAccountService);

      const { cpf }  = request.body;
      const account = await createAccount.execute({
        cpf,
      });

      return response.json(classToClass(account));
  }
}
