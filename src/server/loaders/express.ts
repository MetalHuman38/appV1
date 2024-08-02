import { AsyncLocalStorage } from 'async_hooks';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { env } from '../config/index';
import { router } from '../routes/router';
import { globalErrorHandler } from '../utils/errorHandler';
import { limiter } from './auth/ipConfig';

// ** Express Loader
export default async function ({ app }: { app: Express }) {
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    return next();
  });

  app.use((_req, _res, next) => {
    const store = new AsyncLocalStorage();
    store.run(new Map(), next);
  });

  // ** Body Parsers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  // ** Serve static files from 'dist' directory
  app.use(express.static(path.join(__dirname, 'dist')));

  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  const Trust_Proxy = env.TRUST_PROXY || 'false';
  const numberOfProxies = env.NUMBER_OF_PROXIES || 1;
  if (Trust_Proxy) {
    app.set('trust proxy', true);
  } else if (Trust_Proxy === 'false') {
    app.set('trust proxy', false);
  } else {
    app.set('trust proxy', Trust_Proxy);
    app.set('trust proxy', numberOfProxies);
  }
  app.set('trust proxy', numberOfProxies);

  app.get('/ip', (request, response) => response.send(request.ip));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(limiter);

  app.use(router);

  app.use(globalErrorHandler);

  return app;
}
