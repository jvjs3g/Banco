import { Router } from 'express';
import accountsRoutes from '@modules/accounts/infra/http/routes/accounts.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import password from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/Profile.routes';
import transaction from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/accounts',accountsRoutes);
routes.use('/users',usersRouter);
routes.use('/sessions',sessionRouter);
routes.use('/password', password);
routes.use('/profile',profileRouter);
routes.use('/transaction', transaction);

export default routes;
//
