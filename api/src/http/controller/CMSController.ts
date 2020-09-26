import * as express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/statusApi', getStatusApi);

export default router;

async function getStatusApi(req,res) {
  const whatCmsStatus = await axios.get('https://whatcms.org/API/Status?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742');
  res.json(whatCmsStatus.data)
}
