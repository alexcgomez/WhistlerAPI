import * as express from 'express';
import { UserController } from '../http/controller/UserController';
import { User } from '../Entities/User';

export const UserRoutes = express.Router();

UserRoutes.get('/', async function(req, res){
  const userController: UserController = new UserController();
  await userController.getAllUsers();
});

UserRoutes.get('/:id',((req, res) => {
  const userController: UserController = new UserController();
  userController.getUser(req.params.id).then(users=>res.send(users));
}))

UserRoutes.post('/',((req, res) => {
  const userController: UserController = new UserController();
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  userController.createUser(user).then(user=>res.send(user.id))
}))
