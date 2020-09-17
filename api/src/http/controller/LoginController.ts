import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
const router = express.Router();

router.post('/', login);

export default router;

async function login(req, res) {
  const { email, password } = req.body;
  const user = await getRepository(User).findOne({ email: email });
  const accessTokenSecret = process.env.SECRET_TOKEN;
  if (user) {
    const userPasswordMatch = await user.comparePassword(password);
    console.log(userPasswordMatch);
    if (userPasswordMatch) {
           const accessToken = jwt.sign({ email: user.email }, accessTokenSecret);
              res.json({
                accessToken,
              });

/*      res.json({
        message: 'Welcome back, ' + user.firstName + ' ' + user.lastName,
        login: true
      });*/
    } else {
      res.json({
        message: 'Username or password incorrect',
        login: false
      });
    }
  }
}
