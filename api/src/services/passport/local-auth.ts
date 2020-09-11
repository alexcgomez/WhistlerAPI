import { User } from '../../Entities/User';
import { getRepository } from 'typeorm/index';

const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await getRepository(User).findOne({id: id});
    done(null, user);
  });

  passport.use('register', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (req, email, password, done) => {
      try {
        const user = new User();
        console.log(user);
        user.email = email;
        user.password = await user.encryptPassword(password);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        await getRepository(User).save(user);
        done(null, user);
      } catch (e) {
        done(e);
      }
    },
  ));

  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (req, email, password, done) => {
      try {
        const user = await getRepository(User).findOne({email: email});
        console.log(user);
        done(null, user);
      } catch (e) {
        done(e);
      }
    },
  ));
};
