import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.config';
import { ApiResponse, ErrorObject } from '../interfaces/api.response';

export const validateParameter = (req: Request, res: Response, next: NextFunction) => {
  const errorFormatter = ({
    location, msg, param, value, nestedErrors,
  }) => `${location}[${param}]: ${msg}`;

  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    const errorMessage = result.array().join(';');
    next(createError(400, errorMessage));
  }
  next();
};

export const responseSender = (req: Request, res: Response) => {
  const statusCode = res.statusCode || 200;
  const response = {
    status: 'SUCCESS',
    data: res.locals.result,
  };

  return res.status(statusCode).json(response);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    logger.error(err);

    const statusCode = err.statusCode || '500';
    const message = err.message || 'Internal server error';

    let error: ErrorObject = {
      message,
    };

    if (process.env.NODE_ENV === 'dev') {
      error = {
        ...error,
        stack: err.stack,
      };
    }

    const response: ApiResponse = {
      status: 'ERROR',
      error,
    };

    res.status(statusCode).json(response);

    return;
  }
  next();
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const reqeustStartTime = Date.now();
  const requestId = uuidv4();

  // Skip request log for health check API
  if (req.path === '/_health') {
    next();
    return;
  }

  const {
    rawHeaders, httpVersion, method, socket, url,
  } = req;
  const { remoteFamily, remoteAddress, remotePort } = socket;

  const body = [];
  let requestBody = '';
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    requestBody = Buffer.concat(body).toString();
  });

  const request = {
    requestId,
    timestamp: reqeustStartTime,
    httpVersion,
    method,
    rawHeaders,
    remoteFamily,
    remoteAddress,
    remotePort,
    url,
  };
  logger.info(request);

  res.on('finish', () => {
    const requestEndTime = Date.now();
    const requestProcessTime = requestEndTime - reqeustStartTime;
    const { statusCode } = res;
    const headers = res.getHeaders();

    const response = {
      requestId,
      timestamp: requestEndTime,
      time: requestProcessTime,
      httpVersion,
      method,
      body: requestBody,
      rawHeaders,
      remoteFamily,
      remoteAddress,
      remotePort,
      url,
      response: {
        statusCode,
        headers,
      },
    };

    logger.info(response);
  });

  next();
};