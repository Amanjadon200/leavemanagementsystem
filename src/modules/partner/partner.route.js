import express from 'express';
const partnerRouter = express.Router();
import { getAllPartners, getPartnerSchedule } from './partner.controller.js';

// Partner routes
partnerRouter.get('/getallpartners', getAllPartners);
partnerRouter.get('/:id/schedule', getPartnerSchedule);

export default partnerRouter;
