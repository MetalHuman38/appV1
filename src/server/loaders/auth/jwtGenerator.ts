import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../../config/jwtENV';

dotenv.config();

export const jwtGenerator = (payload: any): string => {
  try {
    return jwt.sign(payload, jwtENV.JWT_SECRET as string, {
      algorithm: jwtENV.JWT_ALGORITHM as jwt.Algorithm,
      expiresIn: jwtENV.JWT_EXPIRES_IN as string,
      issuer: jwtENV.JWT_ISSUER as string,
    });
  } catch (error) {
    throw new Error('Error generating JWT');
  }
};

export const jwtVerifier = (token: string): any => {
  try {
    return jwt.verify(token, jwtENV.JWT_SECRET as string);
  } catch (error) {
    throw new Error('Error verifying JWT');
  }
};

export const jwtRefresh = (payload: any): string => {
  try {
    return jwt.sign(payload, jwtENV.JWT_REFRESH_SECRET as string, {
      algorithm: jwtENV.JWT_ALGORITHM as jwt.Algorithm,
      expiresIn: jwtENV.JWT_REFRESH_EXPIRES_IN as string,
      issuer: jwtENV.JWT_ISSUER as string,
    });
  } catch (error) {
    throw new Error('Error generating JWT');
  }
};

export default {
  jwtGenerator,
  jwtVerifier,
  jwtRefresh,
};
