import * as express from 'express';
import axios from 'axios';

const router = express.Router();

  router.get('/:site', getUserSites);

export default router;

async function getUserSites(req, res) {
  const site = req.query.site;
  console.log(site);
  const cmsData = await axios.get('https://whatcms.org/API/CMS?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742&url='+site);
  res.json(cmsData.data.result)
}
