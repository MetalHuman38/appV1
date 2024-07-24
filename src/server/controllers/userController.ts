import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import { Likes, Posts, ProfilePictures, Users } from '../models/index.model';
import { validateAndParseParams } from '../utils/validateAndParseParams';

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

        const user_id = decodedToken.id;

        const user = await Users.findByPk(user_id);
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
          'profilePic',
          'bio',
        ];

        const users = await Users.getAllUsers(limit, attributes);
        res.status(200).json({ users });
      }
    );
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal server error!' });
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
        if (!user_id) {
          res
            .status(400)
            .json({ message: 'User ID (decodedToken) is required' });
          return;
        }

        const requestedUserId = parseInt(req.query.user_id as string, 10);
        if (!requestedUserId) {
          res.status(400).json({ message: 'Requested ID is required' });
          return;
        }

        const post_id = parseInt(req.query.post_id as string, 10);
        if (!post_id) {
          res.status(400).json({
            message: 'Post ID is required (getUser post_id variables)',
          });
          return;
        }

        const users = await Users.findByPk(user_id);
        if (!users) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        if (users.id !== user_id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        const user = await Users.findOne({
          where: { id: requestedUserId },
        });
        if (!user) {
          res.status(404).json({ message: 'Requested User not found' });
          return;
        }

        const post = await Posts.getPostByReferenceID(requestedUserId);
        if (!post) {
          res
            .status(400)
            .json({ message: 'Post ID is required in post (getUserByID)' });
          return;
        }

        const userLikes = await Likes.findByPk(user_id);
        if (!userLikes) {
          res.status(400).json({ message: 'User ID is required likes routes' });
          return;
        }

        res.status(200).json({
          user,
          post: post || [],
          userLikes: userLikes || [],
          user_id: user_id,
          requestedUserId,
          post_id,
        });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { profilePic: newImageUrl, newUser, ...rest } = req.body;

    const token = req.cookies.jwt;

    if (!token) {
      console.log('Unauthorized - No token');
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('Unauthorized - Invalid token');
          console.log(err.message);
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          console.log('Unauthorized - No user ID');
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
        }

        if (user.id !== user_id) {
          console.log('Unauthorized attempt');
          return res.status(403).json({ message: 'Unauthorized attempt!' });
        }

        if (Object.keys(rest).length === 0 && !newImageUrl) {
          console.log('No fields to update');
          return res.status(400).json({ message: 'No fields to update' });
        }

        if (newUser) {
          const spaceIndex = newUser?.lastIndexOf(' ');
          const firstName =
            spaceIndex !== -1 ? newUser.slice(0, spaceIndex) : newUser;
          const lastName =
            spaceIndex !== -1 ? newUser.slice(spaceIndex + 1) : '';
          rest.firstName = firstName;
          rest.lastName = lastName;
        }

        let profilePic = user?.profilePic;

        if (profilePic && newImageUrl) {
          const image = await ProfilePictures.findProfilePicByReferenceKey(
            'user_id',
            user_id
          );
          if (!image) {
            console.log('No image found');
            return res.status(404).json({ message: 'No image found' });
          }
          profilePic = newImageUrl;
        }

        const attributes = { ...rest, profilePic };

        // ** Update user
        const [affectedCount, updatedUsers] = await Users.updateUser(
          user_id,
          attributes
        );
        if (affectedCount === 0) {
          console.log('Error updating user:', updatedUsers);
          return res.status(500).json({ message: 'Error updating user' });
        }

        return res.status(200).json({ updatedUsers, profilePic });
      }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  return updateUser;
};

export const getUserForPostViewByID = async (req: Request, res: Response) => {
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

        res
          .status(200)
          .json({ requestedUser: requestedUser, user_id: user_id });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserDataByID = async (req: Request, res: Response) => {
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
        const post_id = parseInt(req.query.post_id as string, 10);
        const likes_id = parseInt(req.query.likes_id as string, 10);
        console.log('likes_id', likes_id);

        const users = await Users.findByPk(user_id);
        if (!users) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const creator = post.creator_Id;

        const user = await Users.findByPk(creator);
        if (!user) {
          res.status(404).json({ message: 'Requested User not found' });
          return;
        }

        const userLikes = await Likes.findByPk(creator);
        if (!userLikes) {
          res.status(400).json({ message: 'User ID is required S routes' });
          return;
        }

        res.status(200).json({
          user,
          post,
          userLikes,
          creator,
        });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
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
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        // Validate and parse parameters
        let post_id, likes_id;
        try {
          ({ post_id, likes_id } = validateAndParseParams(req));
        } catch (error: any) {
          res.status(400).json({ message: error.message });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(400).json({ message: 'User not found' });
          return;
        }

        if (user.id !== user_id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        const post = await Posts.getPostByReferenceID(user_id);
        if (!post) {
          res.status(400).json({ message: 'Post not found' });
          return;
        }

        const userLikes = await Likes.findByPk(user_id);
        if (!userLikes) {
          res.status(400).json({ message: 'User likes not found' });
          return;
        }

        console.log('User:', user, 'Post:', post, 'UserLikes:', userLikes);

        res.status(200).json({
          user,
          post,
          userLikes,
          user_id,
          post_id,
          likes_id,
        });
      }
    );
  } catch (error: any) {
    console.error('Error in getCurrentUser:', error.message);
    res.status(400).json({ message: error.message });
  }
};
