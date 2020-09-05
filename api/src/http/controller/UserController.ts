import * as express from 'express';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';

const router = express.Router();

router.get('/:userId', getUser);
router.post('/create', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;

async function getUser(req, res) {
  //TODO:  Validar si existe el usuario
  const user = await getRepository(User).findOne({email:req.params.email});
  res.send(user);
}

async function createUser(req, res) {
  const user: User = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  try {
    await getRepository(User).save(user);
    res.send(user.id);
  } catch (e) {
    res.status(400).send(e)
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
  user.email = req.body.email ? req.body.email : user.email;-
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
  userRepository.delete({id:userId});
  res.send("User with id "+ userId + " has been deleted.");
}
