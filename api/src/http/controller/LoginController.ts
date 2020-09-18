import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';
import * as dotenv from 'dotenv';
import { log } from 'util';

dotenv.config({ path: '../.env' });
const router = express.Router();

router.post('/', login);

export default router;

async function login(req, res) {
  const { email, password } = req.body;

  const user = await getRepository(User).findOneOrFail({ email: email }).catch(() =>
    res.status('401').json({
      message: 'Username or password incorrect',
      loggedIn: false,
    }),
  );
  const accessTokenSecret = process.env.SECRET_TOKEN;
  if (user.id) {
    const userPasswordMatch = await user.comparePassword(password);
    if (userPasswordMatch) {
      const accessToken = jwt.sign({ email: user.email }, accessTokenSecret);
      res.json({
        message: 'Welcome back, ' + user.firstName + ' ' + user.lastName,
        loggedIn: true,
        accessToken: accessToken,
        user: user,
      });
    } else {
      res.status('401').json({
        message: 'Username or password incorrect',
        loggedIn: false,
      });
    }
  }
}
