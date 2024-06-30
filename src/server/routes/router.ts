import express from 'express';
import { env } from '../config/index';
import authRoutes from './authRoutes';
import currentUserRoute from './currentUserRoute';
import userRoutes from './userRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import postRoutes from './postRoutes';
import imageRoutes from './imageRoutes';

const router = express.Router();

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use(express.urlencoded({ extended: false }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

router.get('/', (_req, res) => {
  res.send({
    status: `${env.NODE_ENV}`,
    message: `${env.RESPONSE_STATUS}`,
    name: `${env.APP_NAME}`,
  });
});

router.use(authRoutes);

router.use(postRoutes);

router.use(imageRoutes);

router.use(userRoutes);

router.use(currentUserRoute);

export { router };
