import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';


export default class UsersController {
  public async create(request: Request ,response: Response ): Promise<Response>{

      const createUser = container.resolve(CreateUserService);

      const { name, email, password , cpf, rg, nascimento, nomeDaMae, cep , numero, complemento, rua }  = request.body;
      const user = await createUser.execute({
        name,
        email,
        password,
        cpf,
        rg,
        nascimento,
        nomeDaMae,
        cep,
        numero,
        complemento,
        rua
      });

      return response.json(classToClass(user));
  }
}
