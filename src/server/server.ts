import express from 'express';
import { env } from './config';

async function StartServer() {
  const app = express();
  (await import('./loaders/index.js')).default({ app });
  app
    .listen(env.PORT, () =>
      console.log(`Server started on port Test ${env.PORT}`),
    )
    .on('error', error => {
      console.error(error);
      process.exit(1);
    });
}

StartServer();
