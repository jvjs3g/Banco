import { injectable, inject } from'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenReposory';
import AppError from '@shared/errors/AppError';


interface Request{
  token:string;
  password:string;
}

@injectable()
class ResetPasswordService{
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    ){

  }
  public async execute({ token, password }: Request):Promise<void>{
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken){
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user){
      throw new AppError('User does not exists.');
    }

    user.password = password;

    await this.usersRepository.save(user);

  }
}

export default ResetPasswordService;
