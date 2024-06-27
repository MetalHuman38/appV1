import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  getAllUsers,
  getUserByID,
  updateUser,
} from '../controllers/userController';
import { verifyUser } from '../loaders/auth/userAuth';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import Users from '../models/user.model';

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
router.get('/api/getCurrentUser', verifyUser, async (req, res) => {
  try {
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

        const user_id = decodedToken.id;
        console.log('User ID:', user_id);
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }
        try {
          const user = await Users.findByPk(user_id);
          if (!user) {
            res.status(400).json({ message: 'User ID is required S routes' });
            return;
          }
          res.status(200).json({ user });
        } catch (error) {
          res.status(400).json({ message: 'User ID is required' });
        }
      },
    );
  } catch (error) {
    res.status(400).json({ message: 'User ID is required' });
  }
});

// Get all users
router.get('/api/getAllUsers', getAllUsers);

// Get user by ID
router.get('/api/getUserByID', getUserByID);

// Update user by ID
router.get('/api/updateUser', updateUser);

export default router;
