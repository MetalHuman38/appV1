import dotenv from 'dotenv';
import express, { NextFunction } from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import Users from '../models/user.model';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { verifyUser } from '../loaders/auth/userAuth';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';

const router = express.Router();

dotenv.config();

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
  '/api/getUser',
  verifyUser,
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
          const user = await Users.findByPk(decodedToken.id);
          if (!user) {
            res.status(400).json({ message: 'User ID is required' });
            return;
          }
          res.status(200).json({ user });
        } catch (error) {
          console.error('Error getting current user:', error);
          res.status(500).json({ message: 'Error getting current user' });
        }
        return next();
      },
    );
  },
);

// router.get(
//   '/api/getUser',
//   verifyUser,
//   async (_req: Request, res: Response, next: NextFunction) => {
//     if (!res.locals.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     try {
//       const user = res.locals.user as User;
//       res.status(200).json({ user });
//     } catch (error) {
//       console.error('Error getting current user:', error);
//       res.status(500).json({ message: 'Error getting current user' });
//     }
//     return next();
//   },
// );

export default router;
