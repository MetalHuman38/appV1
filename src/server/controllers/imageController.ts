import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import { ImageStorages, ProfilePictures, Users } from '../models/index.model';

// ** Refactored function to return image URL
export const getImagePreviewUrl = async (
  req: Request,
  res: Response
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
          user_id
        );
        if (!image) {
          res.status(200).json({ message: 'No image found' });
        } else {
          res.status(200).json({ imageUrl: image.imageUrl });
        }
      }
    );
  } catch (error) {
    console.error('Error getting image preview:', error);
    throw new Error('Failed to get image preview');
  }
};

// ** Return Profile picture url for preview
export const getProfilePicPreviewUrl = async (
  req: Request
): Promise<void | null> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error('Unauthorized');
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          throw new Error('Unauthorized');
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          throw new Error('Unauthorized');
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          console.log('No user found');
          throw new Error('Unauthorized');
        }

        const profilePic = await ProfilePictures.findProfilePicByReferenceKey(
          'user_id',
          user_id
        );
        if (!profilePic) {
          console.log('No profile pic found');
          return null;
        }
        console.log('Profile Pic:', profilePic);
        return profilePic;
      }
    );
  } catch (error) {
    console.error('Error getting profile pic preview:', error);
    throw new Error('Failed to get profile pic preview');
  }
};

export default { getImagePreviewUrl, getProfilePicPreviewUrl };
