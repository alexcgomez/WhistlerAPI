import * as express from 'express';
const passport = require('passport');
require('../../services/passport/local-auth')

const router = express.Router();

router.post('/', passport.authenticate('local-signup'));

export default router;
