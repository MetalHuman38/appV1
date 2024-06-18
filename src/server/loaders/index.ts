import expressLoader from './express';
import sequilizeLoader from './dataLoader/sequlize';
import { waitForDB } from './dataLoader/mariadb';
import type { Express } from 'express';

export default async function ({ app }: { app: Express }) {
  await waitForDB();
  sequilizeLoader;
  await expressLoader({ app });
  console.log('Express Intialized!');
}
