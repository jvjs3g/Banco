 import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';


import IAccountRepository from '@modules/account/repositories/IAppintmentRepository';
import AccountRepository from '@modules/account/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


import IUserTokenRepository from '@modules/users/repositories/IUserTokenReposory';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';



 container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
 container.registerSingleton<IUserTokenRepository>('UserTokensRepository',UserTokenRepository);
 container.registerSingleton<IAccountRepository>('AccountRepository',AccountRepository);
