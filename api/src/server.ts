import * as express from 'express';
import { Request, Response } from 'express';
import { UserRespository } from './Repository/UserRespository';
import { createConnection } from 'typeorm/index';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const userRepository = new UserRespository();

createConnection()
  .then(connection => {
  })
  .catch(error => console.log(error));

app.get('/users', (request: Request, response: Response) => {
  userRepository.getUsers().then((result: User[]) => response.send(result));
});

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, )
