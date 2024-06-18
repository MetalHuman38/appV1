import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { getCurrentUser } from '../loaders/auth/userAuth';

const router = express.Router();

router.use(cors());
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

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

router.get(
  '/api/getCurrentUser',
  getCurrentUser,
  async (_req: Request, res: Response) => {
    if (!res.locals.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const user = res.locals.user;
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ message: 'Error getting current user' });
    }
    return res;
  },
);

export default router;
