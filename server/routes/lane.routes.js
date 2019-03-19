import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';
import noteRouter from '../routes/note.routes';

const router = new Router();

router.use('/lanes/:laneId', noteRouter)

router.route('/lanes').post(LaneController.addLane);
router.route('/lanes').get(LaneController.getLanes);
router.route('/lanes/:id').delete(LaneController.deleteLane);
router.route('/lanes/:id').put(LaneController.updateLane);

export default router;
