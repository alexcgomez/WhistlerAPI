import UserController from '../http/controller/UserController';
import { Express } from 'express';
import LoginController from '../http/controller/LoginController';
import SiteController from '../http/controller/SiteController';
import CMSController from '../http/controller/CMSController';

export function routes(app: Express): void {
  app.use('/v1/users', UserController);
  app.use('/v1/login', LoginController);
  app.use('/v1/sites', SiteController);
  app.use('/v1/cmsDetection', CMSController);
}

export default routes;
