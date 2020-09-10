import UserController from '../http/controller/UserController';
import { Express } from 'express';
import LoginController from '../http/controller/LoginController';

export function routes(app: Express): void {
  app.use('/v1/users', UserController);
  app.use('/login', LoginController);
}

export default routes;
