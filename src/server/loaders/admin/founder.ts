import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../../config/jwtENV';
import Admin from '../../models/admin.model';
import UserRegistration from '../../models/userRegister.model';

// ** Check if user is an admin
export const isAdmin = async (
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
        const admin = decodedToken.id;
        if (!admin) {
          res.status(400).json({ message: 'admin id token is required' });
          return;
        }

        const loggedInAdmin = await UserRegistration.findByPk(admin);
        if (!loggedInAdmin) {
          res.status(400).json({ message: 'Current admin not found' });
          return;
        }

        if (loggedInAdmin !== admin) {
          res
            .status(401)
            .json({ message: 'Unauthorized access to admin route' });
          return;
        }

        try {
          const user = await Admin.findByPk(admin);
          console.log('amin:', admin);
          if (user && user.role === 'admin') {
            res.locals.user = user;
          } else {
            res.locals.user = null;
          }
        } catch (error) {
          console.error('Error retrieving user:', error);
          res.locals.user = null;
        }

        res.status(200).json({
          user: res.locals.user,
          loggedInAdmin,
          admin,
        });

        res.locals.user = null;

        next();
      }
    );
  } catch (error) {
    console.error('Error verifying user:', error);
    res.locals.user = null;
  }
};

export default { isAdmin };
