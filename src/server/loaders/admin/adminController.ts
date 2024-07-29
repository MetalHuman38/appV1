import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { jwtENV } from '../../config/jwtENV';
import UserRegistration from '../../models/userRegister.model';
import { handleError } from '../../utils/errorHandler';
import { jwtGenerator, jwtRefresh } from '../auth/jwtGenerator';

// ** Admin Login
export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(new Error('Login Validation Error!'), res);
    }

    const admin = await UserRegistration.loginUser(email, password);
    if (!admin) {
      throw new Error('Admin not found');
    }

    const passwordMatch = await bcrypt.compare(password, admin.hashedpassword);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    const token = jwtGenerator({ id: admin.id });
    const refreshToken = jwtRefresh({ id: admin.id });

    res.cookie('jwt', token, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_MAX_AGE * 1000,
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_REFRESH_MAX_AGE * 1000,
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });

    res.setHeader('Authorization', `Bearer ${token}`);
    res.locals.user = admin;
    res.json({ token, refreshToken, user: admin.id });
  } catch (error: any) {
    handleError(error, res);
  }
};
