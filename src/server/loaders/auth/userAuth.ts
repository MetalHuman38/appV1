import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../../config/jwtENV';
import { Request, Response, NextFunction } from 'express';
import Users from '../../models/user.model';
import { jwtVerifier } from './jwtGenerator';

dotenv.config();

export const getCurrentUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwtVerifier(token);
    const userId = decodedToken.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ message: 'Error getting current user' });
  }
  return token;
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.locals.user = null;
      return next();
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          console.error('JWT verification error:', err.message);
          res.locals.user = null;
          return next();
        }

        try {
          const user = await Users.findByPk(decodedToken.id);
          console.log('decodedToken:', decodedToken);
          if (user) {
            res.locals.user = user;
          } else {
            res.locals.user = null;
          }
        } catch (error) {
          console.error('Error retrieving user:', error);
          res.locals.user = null;
        }

        next();
      },
    );
  } catch (error) {
    console.error('Error verifying user:', error);
    res.locals.user = null;
    next();
  }
};

export default { verifyUser };
