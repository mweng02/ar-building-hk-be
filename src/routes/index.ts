import * as express from 'express';
import createError from 'http-errors';
import { requestLogger } from '../middlewares';
import apiRoute from './api';

const router = express.Router();

router.use(requestLogger);

router.get('/', (req, res) => res.send('Ok'));
router.get('/_health', (req, res) => res.send('Ok'));
router.use('/api', apiRoute);

router.use('*', (req, res, next) => next(createError(404, 'Not found')));

export default router;
