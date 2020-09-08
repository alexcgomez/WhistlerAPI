import * as express from 'express';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';

const router = express.Router();

router.post('/', login);

export default router;

async function login(req, res) {
  try {
    const user = await getRepository(User).findOne({ email: req.body.email });
    if (user.password === req.body.password) {
      res.send(true);
    } else res.send(false)
  } catch (e) {
    res.send(e);
  }
}


