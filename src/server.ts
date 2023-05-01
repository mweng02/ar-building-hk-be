import app from './app';
import { dataSource } from './data-source';

/**
 * Start Express server.
 */
const port = process.env.NODE_PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const server = app.listen(port, () => {
console.log(`Node.js app is running at port:${port} in ${env} mode`);
console.log('Press CTRL-C to stop\n');
});

/**
 * Connect to DB.
 */
const db = dataSource.initialize().then(() => {
}).catch((error: any) => console.log(error));

export default server;
