import UserController  from '../http/controller/UserController';

export function routes(app):void {
  app.use('/v1/users', UserController);
}
export default routes;
