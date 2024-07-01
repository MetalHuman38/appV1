import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import Users from '../models/user.model';
import getImagePreviewUrl from './imageController';
import Posts from '../models/post.model';

dotenv.config();

// Get all Users from database with limit and offset
export const getAllUsers = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    jwt.verify(
      token,
      jwtENV.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const userId = decodedToken.id;

        const user = await Users.findByPk(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        // Optionally, you could add role-based checks here
        // if (user.role !== 'admin') {
        //   res.status(403).json({ message: 'Forbidden' });
        //   return;
        // }

        const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit to 10
        const attributes = [
          'id',
          'firstName',
          'lastName',
          'username',
          'imageURL',
          'avatarUrl',
          'bio',
        ];

        const users = await Users.getAllUsers(limit, attributes);
        res.status(200).json({ users });
      },
    );
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
// export const getUserByID = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       res.status(401).json({ message: 'Unauthorized' });
//       return;
//     }
//     jwt.verify(
//       token,
//       jwtENV.JWT_SECRET,
//       async (err: any, decodedToken: any) => {
//         if (err) {
//           console.log(err.message);
//           res.status(401).json({ message: 'Unauthorized' });
//           return;
//         }

//         const user_id = decodedToken.id;

//         const user = await Users.findByPk(user_id);
//         if (!user) {
//           res.status(404).json({ message: 'User not found' });
//           return;
//         }

//         if (user.id !== user_id) {
//           res.status(403).json({ message: 'Unauthorized attempt!' });
//           return;
//         }

//         const requestedUser = await Users.findAll({
//           where: { id: user_id },
//           include: [
//             {
//               model: Posts,
//               attributes: [
//                 'id',
//                 'caption',
//                 'imageURL',
//                 'location',
//                 'tags',
//                 'likes_Count',
//                 'created_At',
//                 'creator_Id',
//               ],
//             },
//           ],
//         });
//         if (!requestedUser) {
//           res.status(404).json({ message: 'User not found' });
//           return;
//         }

//         res
//           .status(200)
//           .json({ requestedUser: requestedUser, user_id: user_id });
//       },
//     );
//   } catch (error) {
//     console.error('Error getting user by ID:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Update user by ID

export const getUserByID = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    jwt.verify(
      token,
      jwtENV.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const user_id = decodedToken.id;

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        if (user.id !== user_id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        const requestedUser = await Users.findAll({
          where: { id: user_id },
          include: [
            {
              model: Posts,
              attributes: [
                'id',
                'caption',
                'imageURL',
                'location',
                'tags',
                'likes_Count',
                'created_At',
                'creator_Id',
              ],
            },
          ],
        });
        if (!requestedUser) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        res.status(200).json({ requestedUser });
      },
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attributes = req.body;
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const user_id = decodedToken.id;

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        if (user.id !== Number(id)) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        let { imageUrl: newImageUrl } = req.body;
        if (newImageUrl) {
          try {
            const previewImageUrl = await getImagePreviewUrl(req, res);
            if (!previewImageUrl) {
              res.status(404).json({ message: 'Image not found' });
              return;
            }
            attributes.imageUrl = previewImageUrl;
          } catch (error) {
            console.error('Error fetching image preview URL:', error);
            res.status(500).json({ message: 'Error updating profile picture' });
            return;
          }
        }

        const [affectedCount, updatedUsers] = await Users.updateUser(
          Number(id),
          attributes,
        );
        if (affectedCount === 0) {
          res.status(400).json({ message: 'Error updating user' });
          return;
        }

        res.status(200).json({ updatedUsers });
      },
    );
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
