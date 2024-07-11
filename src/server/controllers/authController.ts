import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import { jwtGenerator, jwtRefresh } from '../loaders/auth/jwtGenerator';
import { UserRegistration } from '../models/index.model';
import { handleError } from '../utils/errorHandler';

dotenv.config();

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return handleError(new Error('New User validation error'), res);
    }
    // Check if user already exists
    const userExists = await UserRegistration.findOne({
      where: { email: email },
    });
    if (userExists) {
      return handleError(
        new Error('UserRegistrations.email: User already exists '),
        res
      );
    }

    const user = await UserRegistration.create({
      newUser: name,
      username: username,
      email: email,
      hashedpassword: password,
      createdAt: new Date(),
    });
    const token = jwtGenerator({ id: user.id });
    res.cookie('jwt', token, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_MAX_AGE * 1000,
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });
    res.status(201).json({
      id: user.id,
      name: user.newUser,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(new Error('Login Validation Error!'), res);
    }
    const user = await UserRegistration.loginUser(email, password);
    if (!user) {
      throw new Error('User not found');
    }
    const token = jwtGenerator({ id: user.id });
    const refreshToken = jwtRefresh({ id: user.id });
    console.log('User logged in:', refreshToken);
    // Setting the access token cookie
    res.cookie('jwt', token, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_MAX_AGE * 1000, // in milliseconds
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });

    // Setting the refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_REFRESH_MAX_AGE * 1000, // in milliseconds
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.locals.user = user;
    res.json({ token, refreshToken, user: user.id });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const userLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accessToken = req.cookies.jwt;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      res.status(400).json({ message: 'No tokens provided!' });
      return;
    }

    // Clear the access token
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1, // 1 millisecond to effectively expire the cookie
    });

    // Clear the refresh token
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1, // 1 millisecond to effectively expire the cookie
    });

    res.status(200).json({ message: 'User logged out' });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(
    refreshToken,
    jwtENV.JWT_REFRESH_SECRET as string,
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

        const user = await UserRegistration.findByPk(user_id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Generate a new token
        const newToken = jwt.sign(
          { id: user.id },
          jwtENV.JWT_SECRET as string,
          {
            expiresIn: jwtENV.JWT_EXPIRES_IN as string,
            algorithm: jwtENV.JWT_ALGORITHM as jwt.Algorithm,
            issuer: jwtENV.JWT_ISSUER as string,
          }
        );

        res.cookie('jwt', newToken, {
          httpOnly: jwtENV.JWT_HTTP_ONLY,
          maxAge: jwtENV.JWT_REFRESH_MAX_AGE * 1000,
          secure: jwtENV.JWT_SECURE,
          sameSite: 'lax',
        });
        res.status(200).json({ token: newToken, user: user.id });
      } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Error getting current user' });
      }
      return;
    }
  );
};
