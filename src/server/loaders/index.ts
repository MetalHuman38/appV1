import type { Express } from 'express';
import loader from '../services/performance';
import { truncateTables } from '../services/truncate';
import { appCache } from '../utils/nodeCache';
import { waitForDB } from './dataLoader/mariadb';
import sequilizeLoader from './dataLoader/sequlize';
import expressLoader from './express';

// ** Express Loader
export default async function ({ app }: { app: Express }) {
  appCache.flushAll();
  await truncateTables();
  await waitForDB();
  sequilizeLoader;
  await expressLoader({ app });
  loader();
  console.log('Express Server Intialized!');
}
