import expressLoader from './express';
import sequilizeLoader from './dataLoader/sequlize';
import { waitForDB } from './dataLoader/mariadb';
import type { Express } from 'express';
import { truncateTables } from '../services/truncate';
import loader from '../services/performance';

export default async function ({ app }: { app: Express }) {
  await truncateTables();
  await waitForDB();
  sequilizeLoader;
  await expressLoader({ app });
  loader();
  console.log('Express Server Intialized!');
}
