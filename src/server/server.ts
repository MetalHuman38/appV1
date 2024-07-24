require('dotenv').config();
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';
import http from 'node:http'; // Correctly import the 'http' module
import process from 'node:process';
import { Worker } from 'worker_threads';
import { env } from './config/index';

const THREAD_COUNT = 4;

const WorkerFilePath = './four-worker.config.js';

async function StartServer() {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:8080',
      credentials: true,
    })
  );

  (await import('./loaders/index.js')).default({ app });

  app.use('/heavy', (_req, res) => {
    const heavy = Array.from({ length: 1e6 }, () => Math.random());
    let total = 0;
    for (let i = 0; i < heavy.length; i++) {
      total += heavy[i];
    }
    res.send(
      `The result of the CPU = ${heavy} and total operation is: ${total}`
    );
  });

  app.get('/non-blocking/', (_req, res) => {
    res.status(200).send('Non-blocking request');
  });

  async function runWorker(): Promise<number> {
    const worker = new Worker(WorkerFilePath, {
      workerData: { thread_count: THREAD_COUNT },
    });
    return new Promise((resolve, reject) => {
      worker.on('message', data => {
        resolve(data);
      });
      worker.on('error', error => {
        reject(`Worker error: ${error}`);
      });
      worker.on('exit', code => {
        if (code !== 0) {
          reject(`Worker stopped with exit code ${code}`);
        }
      });
    });
  }

  app.get('/blocking-worker', async (_req, res) => {
    const start = Date.now();
    try {
      const workerResult = await runWorker();
      console.log(`Worker took ${Date.now() - start}ms to complete`);
      res.status(200).send(`Blocking worker: ${workerResult}`);
    } catch (error) {
      console.log(`Error in worker: ${error}`);
      res.status(500).send(`Blocking worker failed: ${error}`);
    }
  });

  app.get('/blocking', async (_req, res) => {
    const start = Date.now();
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
      workerPromises.push(runWorker());
    }

    try {
      const threadResults = await Promise.all(workerPromises);
      const total_results =
        threadResults[0] +
        threadResults[1] +
        threadResults[2] +
        threadResults[3];
      console.log(`Workers took ${Date.now() - start}ms to complete`);
      res.status(200).send(`Blocking workers: ${total_results}`);
    } catch (error) {
      console.log(`Error in worker: ${error}`);
      res.status(500).send(`Blocking workers failed: ${error}`);
    }
  });

  const server = http.createServer(app);

  const asyncLocalStorage = new AsyncLocalStorage();

  function logWithId(msg: unknown) {
    const id = asyncLocalStorage.getStore();
    console.log(`${id !== undefined ? id : '-'} ${msg}`);
  }

  let idSeq = 0;
  server.on('connection', socket => {
    const id = idSeq++;
    asyncLocalStorage.run(id, () => {
      logWithId('Client connected to server!!!');
      socket.on('close', () => {
        logWithId('Client disconnected from server!!!');
      });
    });
  });

  server.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
      level: env.COMPRESSION_LEVEL || 9,
      threshold: env.COMPRESSION_THRESHOLD || 1024,
    })
  );

  const idleTimeout = env.IDLE_TIMEOUT || 480000;
  let idleTimer = setTimeout(() => {
    server.close(() => {
      console.log('Server closed due to idle time out! Restarting....');
      process.exit(0);
    });
  }, idleTimeout);

  app.use((_req, _res, next) => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      server.close(() => {
        console.log('Cleared Time out! Restarting....');
        process.exit(0);
      });
    }, idleTimeout);
    next();
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught Exception:', err, 'Origin:', origin);
    process.exit(1);
  });

  server.on('error', error => {
    console.error(error);
    process.exit(1);
  });
}

StartServer();

export default {
  StartServer,
};
