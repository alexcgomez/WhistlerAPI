import * as express from 'express';
import axios from 'axios';
import { verifyLoggedUser } from '../../services/Authentication';
import { getRepository } from 'typeorm/index';
import { User } from '../../Entities/User';
import { Site } from '../../Entities/Sites';
import { Cms } from '../../Entities/Cms';

const router = express.Router();

router.get('/', getUserSites);
router.post('/', addUserSite);
router.delete('/', deleteUserSites);

export default router;

async function getUserSites(req, res) {
  const user = await getRepository(User).findOne({ id: req.query.userId });
  const sites = await getRepository(Site).find({ where: { user: user } });
  res.send(sites);
}

async function addUserSite(req, res) {
  //verifyLoggedUser(req, res);
  const user = await getRepository(User).findOneOrFail({ id: req.body.userId });
  const cmsData = await axios.get('https://whatcms.org/API/CMS?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742&url=' + req.body.siteUrl);
  switch (cmsData.data.result.code) {
    case 200:
      //TODO: Implement CMS latest version query, checking 10 sec limitation
      /*
      const cms = await getRepository(Cms)
        .findOneOrFail({ name: cmsData.data.result.name })
        .catch(async () => {
          const cms = new Cms();
          cms.name = cmsData.data.result.name;
          cms.url = req.body.siteUrl;
          //const cmsRes = await axios.get('https://whatcms.org/API/CMS?key=5325fbcc075fdb7731ac55a90edacc4ebc4403164db60dc3e4967beb1f18d630e3f742&url=' + cms.name + '.com');
          //cms.latestRelease = cmsRes.data.result.version;
          cms.latestRelease = 'To be implemented';
          return await getRepository(Cms).save(cms);
        });
      */
      try {
        const site = new Site();
        //site.cms = cms;
        site.name = req.body.siteUrl;
        site.url = req.body.siteUrl;
        site.version = cmsData.data.result.version;
        site.user = user;
        await getRepository(Site)
          .save(site)
          .catch(() => {
            res.status('409').json({
              message: 'This site already exists.',
            });
          });
        // res.status('200').json({
        //   message: 'Site added successfully!',
        // });
        res.send(getRepository(Site).find({ where: { user: user } }));
      } catch (e) {
        const sites = await getRepository(Site).find({ where: { user: user } });
        res.status('400').json({
          message: e.message,
          sites: sites,
        });
      }
      break;
    case 201:
      res.status('201').json({
        message: 'CMS or Host Not Found',
      });
      break;
    case 120:
      res.status('120').json({
        message: 'Too Many Requests',
      });
      break;
    default:
      res.status('401').json({
        message: 'Generic error',
      });
      break;
  }
}

async function deleteUserSites(req, res) {
  // TODO: Need to add auth token at header request
  // verifyLoggedUser(req, res);
  const user = await getRepository(User).findOneOrFail({ id: req.query.userId });
  let sites = await getRepository(Site).find({ where: { user: user, url: req.query.siteUrl } });
  await getRepository(Site).remove(sites);
  // res.status('200').json({
  //   message: 'Site deleted successfully!',
  // });
  res.status('200');
  res.send(await getRepository(Site).find({ where: { user: user } }));
}
