import * as express from 'express';
const passport = require('passport');
require('../../services/passport/local-auth')

const router = express.Router();

router.get('/', passport.authenticate('local-signup',{
  passReqToCallback:true
}));

export default router;




