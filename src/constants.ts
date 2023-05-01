import path from 'path';
import dotenv from 'dotenv';
import logger from './config/logger.config';

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

const envFileName = prod ? '../.env' : '../.env';
dotenv.config({
  path: path.join(__dirname, envFileName),
});

// MYSQL
export const DATABASE = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  type: process.env.type,
};

if (!process.env.DB_HOST) {
  logger.error('No mysql connection string. Set DB_HOST environment variable.');
  process.exit(1);
}
