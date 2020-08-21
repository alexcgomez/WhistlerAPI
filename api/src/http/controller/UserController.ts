import * as express from 'express';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';

const router = express.Router();

router.get('/', getUsers);
router.post('/create',createUser);

export default router;

async function getUsers(req, res) {
  const users = getRepository(User).find();
  res.send(users);
}

async function createUser(req, res) {
  const user:User = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  await getRepository(User).save(user)
  res.send(user.id);
}


