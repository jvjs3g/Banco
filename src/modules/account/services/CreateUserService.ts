import { injectable, inject } from'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IAccountRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request{
  name: string;
  email: string;
  password: string;
  cpf: string;
  rg: string;
  nascimento: string;
  nomeDaMae: string;
  cep: string;
  numero: string;
  complemento: string;
  rua: string;
}

@injectable()
class CreateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ){

  }
  public async execute({ name, email, password, cpf, rg, nascimento, nomeDaMae, cep, rua, complemento, numero }:Request):Promise<User>{

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if(checkUserExists){
      throw new AppError('Email address already used.');
    }

    const checkCpfExists = await this.usersRepository.findByCpf(cpf);

    if(checkCpfExists){
      throw new AppError('CPF already exists');
    }

    const checkRgExists = await this.usersRepository.findByRg(rg);

    if(checkRgExists){
      throw new AppError('RG already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password:hashedPassword,
      cpf,
      rg,
      nascimento,
      nomeDaMae,
      cep,
      complemento,
      numero,
      rua
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}//

export default CreateUserService;
