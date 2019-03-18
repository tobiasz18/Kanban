import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

router.route('/lanes').post(LaneController.addLane);
router.route('/lanes').get(LaneController.getLanes);
router.route('/lanes/:id').delete(LaneController.deleteLane);
router.route('/lanes/:id').put(LaneController.updateLane);

export default router;
