import expressLoader from './express';
import { waitForDB } from './dataLoader/mariadb';
import type { Express } from 'express';

export default async function ({ app }: { app: Express }) {
  await waitForDB();
  await expressLoader({ app });
  console.log('Express Intialized!');
}
