import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAccountService from '@modules/accounts/services/CreateAccountService';

export default class AccountController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createAccount = container.resolve(CreateAccountService);

      function getRandomIntInclusive() {
        var min = Math.ceil(1);
        var max = Math.floor(10);
      }

      getRandomIntInclusive();

      const { cpf }  = request.body;
      const acccount = await createAccount.execute({
        cpf,
        agencia : Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        conta : Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      });

      return response.json(classToClass(acccount));
  }
}
