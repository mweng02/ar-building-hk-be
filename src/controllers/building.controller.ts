import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.config';
import { fetchBuildingsByBbox } from '../services/building.service';
import createError from 'http-errors';

const fetchBuildings = async (req: any, res: any, next: NextFunction) => {
  try {
      if(req.query.bbox && /^[0-9\.\-\,]+$/.exec(req.query.bbox)) {
        const bbox = req.query.bbox?.split(',').map((str: string) => parseFloat(str)) || [];
        if(bbox.length == 4) {
          // West South East North
          const data = await fetchBuildingsByBbox(
            bbox[0], // West
            bbox[1], // South
            bbox[2], // East
            bbox[3] // North
          );
          res.locals.result = { buildings: data };
          next();
        } else {
          throw createError(400, 'Bbox does not have 4 values');
        } 
    } else {
      throw createError(400, 'Invalid bbox format');
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export {
  fetchBuildings,
};