import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../../config/jwtENV';
import { Users } from '../../models/index.model';

dotenv.config();

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        jwtENV.JWT_SECRET as string,
        async (err: any, decodedToken: any) => {
          if (err) {
            console.log(err.message);
            res.locals.user = null;
          } else {
            try {
              const user = await Users.findByPk(decodedToken.id);
              res.locals.user = user;
            } catch (error) {
              console.error('Error retrieving user:', error);
              res.locals.user = null;
            }
          }
          next();
        }
      );
    } else {
      res.locals.user = null;
      next();
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.locals.user = null;
    next();
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
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
      }
    );
  } catch (error) {
    console.error('Error verifying user:', error);
    res.locals.user = null;
  }
};

export default { verifyUser, requireAuth };
