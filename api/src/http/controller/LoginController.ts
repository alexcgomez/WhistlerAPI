import * as express from 'express';
const passport = require('passport');
require('../../services/passport/local-auth');

const router = express.Router();

router.get('/', passport.authenticate('login'), login);

async function login(req, res) {
    res.json({
      message: 'Login successful',
      user: req.user
    })
}

export default router;
