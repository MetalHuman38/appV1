import express from 'express';
import type { Express } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corOptions } from '../config/corOptions';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '../config/index';
import { router } from '../routes/router';

export default async function ({ app }: { app: Express }) {
  app.get('/status', (_req, res) => res.sendStatus(200).end());
  app.get('/status', (_req, res) => res.sendStatus(200).end());

  // Allow CORS
  app.use(cors(corOptions));
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.enable('trust proxy');

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(morgan(env.MORGAN));

  app.use(router);

  return app;
}
