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

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    }, async (req, email, password, done) => {

      const user = new User();
      user.email = email;
      user.password = password
      console.log(user);
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      await getRepository(User).save(user);

      done(null, user);
    },
  ))
  ;
};
