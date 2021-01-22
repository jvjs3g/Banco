import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';


import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


import IUserTokenRepository from '@modules/users/repositories/IUserTokenReposory';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import AccountRepository from '@modules/account/infra/typeorm/repositories/AccountRepository';

 container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
 container.registerSingleton<IUserTokenRepository>('UserTokensRepository',UserTokenRepository);
 container.registerSingleton<IAccountRepository>('AccountsRepository',AccountRepository);
