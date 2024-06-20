import expressLoader from './express';
import sequilizeLoader from './dataLoader/sequlize';
import { waitForDB } from './dataLoader/mariadb';
import type { Express } from 'express';
import { truncateTables } from '../services/truncate';

export default async function ({ app }: { app: Express }) {
  await truncateTables();
  await waitForDB();
  sequilizeLoader;
  await expressLoader({ app });
  console.log('Express Server Intialized!');
}
