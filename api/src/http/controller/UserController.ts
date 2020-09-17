import * as express from 'express';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';
import * as dotenv from 'dotenv';
import { verifyLoggedUser } from '../../services/Authentication';

dotenv.config({ path: '../.env' });

const router = express.Router();

router.get('/', getUser);
router.post('/create', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;

async function getUser(req, res) {
  verifyLoggedUser(req, res);
  try {
    const user = await getRepository(User).findOne({ id: req.query.id });
    res.send(user.firstName + ' ' + user.lastName);
  } catch (e) {
    res.status('404').send('User not found.');
  }
}

async function createUser(req, res) {
  try {
    const userRepository = await getRepository(User);
    const user = new User();
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await userRepository.save(user).catch(() => {
      res.status('409').send('This user already exists.');
    });
    res.send(user.id);
  } catch (e) {
    res.status('400').send(e.message);
  }
}

async function updateUser(req, res) {
  const userId = req.params.userId;
  const userRepository = await getRepository(User);
  const user = await userRepository.findOne(userId);
  if (!user) {
    return res.status('404').send('User with id ' + userId + ' not found');
  }
  user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
  user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
  user.email = req.body.email ? req.body.email : user.email;
  -
    userRepository.update({ id: user.id }, user);
  res.send(user);
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  const userRepository = await getRepository(User);
  const user = await userRepository.findOne(userId);
  if (!user) {
    return res.status('404').send('User with id ' + userId + ' not found');
  }
  userRepository.delete({ id: userId });
  res.send('User with id ' + userId + ' has been deleted.');
}

