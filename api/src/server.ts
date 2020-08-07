import * as express from 'express';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { getManager } from 'typeorm/index';
import { User } from './Entities/User';
import { UserController } from './http/controller/UserController';

dotenv.config({path: '../.env'});
const {SERVER_PORT} = process.env;
//DB
createConnection().then(async () => {

//EXPRESS
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(morgan('short'));

  app.get('/', (req, res) => {
    const userController: UserController = new UserController();
    userController.getAllUsers().then((users)=>res.send(users))
  });

  app.listen(SERVER_PORT, () => {
    console.log('Server running on Port: ' + SERVER_PORT);
  });
}).catch(error => console.log(error));


