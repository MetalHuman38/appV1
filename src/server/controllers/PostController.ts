import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ImageStorage from '../models/image.model';
import Users from '../models/user.model';
import { jwtENV } from '../config/jwtENV';
import Posts from '../models/post.model';

dotenv.config();

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { caption, location, tags } = req.body;

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
          console.log(err.message);
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const user_id = decodedToken.id; // Ensure that the token contains the user ID

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        // Retrieve the image URL from the ImageStorage table using the static method
        const imageRecord = await ImageStorage.findImageByReferenceKey(
          'user_id',
          user_id,
        );
        if (!imageRecord) {
          return res.status(404).json({ message: 'Image not found' });
        }

        const newPost = await Posts.create({
          caption: caption,
          imageURL: imageRecord.imageUrl,
          location: location,
          tags: tags || '',
          created_At: new Date(),
          creator_Id: user.id,
        });
        if (!newPost) {
          res.status(400).json({ message: 'Error creating new post.' });
          return;
        } else {
          res
            .status(201)
            .json({ message: 'Post created successfully', newPost });
        }
        return newPost;
      },
    );
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
