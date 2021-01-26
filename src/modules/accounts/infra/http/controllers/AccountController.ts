import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAccountService from '@modules/accounts/services/CreateAccountService';


export default class AccountController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createAccount = container.resolve(CreateAccountService);

      const { cpf }  = request.body;
      const acccount = await createAccount.execute({
        cpf,
        agencia:'123',
        conta:'321'
      });

      return response.json(classToClass(acccount));
  }
}
