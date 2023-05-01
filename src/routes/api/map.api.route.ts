import { Router } from 'express';
import { fetchBuildings } from '../../controllers/building.controller';
import { responseSender } from '../../middlewares';

const router = Router();

router.get('/', fetchBuildings, responseSender);

export default router;
