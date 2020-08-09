import UserController  from '../http/controller/UserController';

export function routes(app):void {
  app.use('/users', UserController);
}
export default routes;
