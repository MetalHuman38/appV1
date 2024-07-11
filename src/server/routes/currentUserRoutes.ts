import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import { verifyUser } from '../loaders/auth/userAuth';
import { Users } from '../models/index.model';

const router = express.Router();

dotenv.config();

router.use(cors());
router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

router.get('/api/getUser', verifyUser, async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log('No token found: send 401 Unauthorized');
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
        const user = await Users.findByPk(decodedToken.id);
        if (!user) {
          return res
            .status(400)
            .json({ message: 'User ID is required S routes' });
        }
        res.status(200).json({ user });
      } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Error getting current user' });
        return; // Add a return statement here
      }
      return; // Add a return statement here
    } // Add a return statement here
  );
});

export default router;
