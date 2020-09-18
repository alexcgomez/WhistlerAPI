import * as express from 'express';
import axios from 'axios';
import { verifyLoggedUser } from '../../services/Authentication';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';
import { Site } from '../../Entities/Sites';
import { Cms } from '../../Entities/Cms';

const router = express.Router();

router.post('/getUserSites', getUserSites);
router.post('/', addUserSites);

export default router;

async function getUserSites(req, res) {
  const user = await getRepository(User).findOne({id:req.body.userId})
  console.log(user);
  const sites = await getRepository(Site).find({ where: { user: user } });
  res.send(sites)
}

async function addUserSites(req, res) {
  verifyLoggedUser(req, res);
  const user = await getRepository(User).findOneOrFail({ id: req.body.userId });
  const cmsData = await axios.get('https://whatcms.org/API/CMS?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742&url=' + req.body.siteUrl);
  const cms = await getRepository(Cms).findOneOrFail({ name: cmsData.data.result.name }).catch(async () => {
    const cms = new Cms();
    cms.name = cmsData.data.result.name;
    cms.url = req.body.siteUrl;
    const cmsRes = await axios.get('https://whatcms.org/API/CMS?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742&url=' + cms.name + '.com');
    console.log(cmsRes.data);
    cms.latestRelease = cmsRes.data.result.version;
    return await getRepository(Cms).save(cms);
  });
  const site = new Site();
  site.cms = cms;
  site.name = req.body.siteUrl;
  site.url = req.body.siteUrl;
  site.version = cmsData.data.result.version;
  site.user = user;
  await getRepository(Site).save(site);
  res.send('Added site correctly');
}
