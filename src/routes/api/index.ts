import * as express from 'express';
import mapRouter from './map.api.route';

const router = express.Router();

router.use('/map', mapRouter);

export default router;
