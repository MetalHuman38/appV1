import type { Express } from 'express';
import loader from '../services/performance';
import { truncateTables } from '../services/truncate';
import { waitForDB } from './dataLoader/mariadb';
import sequilizeLoader from './dataLoader/sequlize';
import expressLoader from './express';

export default async function ({ app }: { app: Express }) {
  await truncateTables();
  await waitForDB();
  sequilizeLoader;
  await expressLoader({ app });
  loader();
  console.log('Express Server Intialized!');
}
