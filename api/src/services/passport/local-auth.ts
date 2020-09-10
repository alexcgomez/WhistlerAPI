const passport = require('passport');
const passportLocal = require('passport-local');
import { User } from '../../Entities/User';
import { getRepository } from 'typeorm/index';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getRepository(User).findByIds([id]);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  const user = new User();
  user.email = email;
  user.password = user.encryptPassword(password);
  await getRepository(User).save(user);
  done(null, user);
}));
