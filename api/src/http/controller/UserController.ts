import * as express from 'express';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.put('/:userId', updateUser);

export default router;

async function getUsers(req, res) {
  const users = await getRepository(User).find();
  res.send(users);
}

async function createUser(req, res) {
  const user: User = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  await getRepository(User).save(user);
  res.send(user.id);
}

async function updateUser(req, res) {
  const userId = req.params.userId;
  const user = await getRepository(User).findOne(userId);
  if (!user) {
    return res.status('404').send('User with id ' + userId + ' not found');
  }
  user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
  user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
  user.email = req.body.email ? req.body.email : user.email;
  await getRepository(User).update({ id: user.id }, user);
  res.send(user);
}


