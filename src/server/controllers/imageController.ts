import { Request, Response } from 'express';
import ImageStorages from '../models/image.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from '../models/user.model';

// Refactored function to return image URL
export const getImagePreviewUrl = async (
  req: Request,
  res: Response,
): Promise<void | null> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const image = await ImageStorages.findImageByReferenceKey(
          'user_id',
          user_id,
        );
        if (!image) {
          res.status(200).json({ message: 'No image found' });
        } else {
          res.status(200).json({ imageUrl: image.imageUrl });
        }
      },
    );
  } catch (error) {
    console.error('Error getting image preview:', error);
    throw new Error('Failed to get image preview');
  }
};

export default getImagePreviewUrl;
