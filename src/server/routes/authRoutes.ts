import express from 'express';
import cors from 'cors';
import { corOptions } from '../config/corOptions';
import * as authController from '../controllers/authController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cors(corOptions));

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

router.post('/api/register', authController.userRegister);

router.post('/api/login', authController.userLogin);

router.get('/api/logout', authController.userLogout);

router.post('/api/refresh-token', authController.refreshToken);

router.get('/api/currentUser', authController.requireAuth);

export default router;
