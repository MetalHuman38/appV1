import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { env } from '../config/index';
import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import currentUserRoutes from './currentUserRoutes';
import imageRoutes from './imageRoutes';
import postRoutes from './postRoutes';
import userDataRoutes from './userDataRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight request for CORS
  }
  return next();
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

router.use(adminRoutes);

router.use(authRoutes);

router.use(userRoutes);

router.use(currentUserRoutes);

router.use(userDataRoutes);

router.use(postRoutes);

router.use(imageRoutes);

export { router };
