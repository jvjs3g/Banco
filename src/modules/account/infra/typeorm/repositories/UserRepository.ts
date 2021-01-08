import { getRepository, Repository, Not } from 'typeorm';

import IUserRepository from "@modules/users/repositories/IUsersRepository";

import User from '../entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';


class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByCpf(cpf:string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf }
    });

    return user;
  }

  public async findByRg(rg: string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { rg }
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { email}
    });

    return user;
  }

  public async findAllProviders({excep_user_id}:IFindAllProviderDTO): Promise<User[]>{

    let users: User[];

   if(excep_user_id){
     users = await this.ormRepository.find({
      where:{
        id: Not(excep_user_id),
      }
    });
   }else{
      users = await this.ormRepository.find();
   }
    return users;
  }

  public async create({name,email,password, cpf, rg, nascimento , nomeDaMae, cep, numero, complemento, rua }: ICreateUserDTO): Promise<User>{
    const appointment = this.ormRepository.create({
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

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
