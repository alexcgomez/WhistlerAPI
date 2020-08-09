import * as express from 'express';

let router = express.Router();

// SWAGER
router.get('/', getUsers);
//
export default router;

async function getUsers(req, res) {
  try {
    res.json({"rows":"hola"});
  } catch (e) {
    res.json({error: e.toString()});
  }
}



