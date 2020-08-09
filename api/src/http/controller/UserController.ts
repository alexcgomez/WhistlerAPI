import * as express from 'express';
import { getManager } from 'typeorm/index';
import { User } from '../../Entities/User';

let router = express.Router();

router.get('/', getUsers);

export default router;

async function getUsers(req, res) {
await res.send(getManager().getRepository(User).createQueryBuilder('User').getMany())
}



