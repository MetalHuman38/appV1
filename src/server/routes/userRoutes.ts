import express, { NextFunction } from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model';
import { jwtENV } from '../config/jwtENV';
import { requireAuth } from '../loaders/auth/userAuth';
import {
  getAllUsers,
  getUserByID,
  updateUser,
} from '../controllers/userController';

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

// User Authentication Middleware
router.get(
  '/api/getCurrentUser',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('JWT verification error', err.message);
          res.status(401).json({ message: 'Unauthorized Invalid Token' });
          return;
        }
        try {
          const user_id = decodedToken.id;
          if (!user_id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
          }
          const user = await Users.findByPk(user_id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.error('Error getting current user:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
        return next();
      },
    );
  },
);

// Get all users
router.get('/api/getAllUsers', getAllUsers);
 
// Get user by ID
router.get('/api/getUserByID', getUserByID);

// Update user by ID
router.get('/api/updateUser', updateUser);

export default router;
