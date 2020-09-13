import UserController from '../http/controller/UserController';
import { Express } from 'express';
import LoginController from '../http/controller/LoginController';
import SiteController from '../http/controller/SiteController';

export function routes(app: Express): void {
  app.use('/v1/users', UserController);
  app.use('/auth', LoginController);
  app.use('/v1/sites', SiteController)
}

export default routes;
