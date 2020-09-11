import * as express from 'express';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { routes } from './routes/Routes';

const session = require('express-session');
const passport = require('passport');
require('./services/passport/local-auth')(passport)

// Environment Config
dotenv.config({path: '../.env'});
const {SERVER_PORT} = process.env;

//DB
createConnection().then(async () => {

//EXPRESS
  const app = express();

  // Middlewares
  app.use(session({
    secret: 'mySecretSession',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());

  app.use(morgan('dev'));
  routes(app);

  // Server Run
  app.listen(SERVER_PORT, () => {
    console.log('Server running on Port: ' + SERVER_PORT);
  });
}).catch(error => console.log(error));


