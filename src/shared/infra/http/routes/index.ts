import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import password from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/Profile.routes';
import account from '@modules/account/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/users',usersRouter);
routes.use('/sessions',sessionRouter);
routes.use('/password', password);
routes.use('/profile',profileRouter);
routes.use('/account', account);
export default routes;
//
