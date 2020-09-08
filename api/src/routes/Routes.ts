import UserController  from '../http/controller/UserController';
import AuthenticationController  from '../http/controller/AuthenticationController';
import { Express } from 'express';

export function routes(app: Express):void {
  app.use('/v1/users', UserController);
  app.use('/v1/login', AuthenticationController)
}
export default routes;
