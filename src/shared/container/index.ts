import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountRepository from '@modules/accounts/infra/typeorm/repositories/AccountRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


import IUserTokenRepository from '@modules/users/repositories/IUserTokenReposory';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';


container.registerSingleton<IAccountsRepository>('AccountsRepository', AccountRepository);
container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokenRepository>('UserTokensRepository',UserTokenRepository);
