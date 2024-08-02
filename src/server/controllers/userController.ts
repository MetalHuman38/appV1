import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { jwtENV } from '../config/jwtENV';
import { Posts, ProfilePictures, Users } from '../models/index.model';
import { validateAndParseParams } from '../utils/validateAndParseParams';

dotenv.config();

// ** Get all Users from database with limit and offset
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

        const users_id = decodedToken.id;
        if (!users_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }
        const users = await Users.findByPk(users_id);
        if (!users) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit to 10

        const user = await Users.findAll();

        if (!user) {
          res.status(404).json({ message: 'Users not found' });
          return;
        }

        if (!user || user.length === 0) {
          res.status(404).json({ message: 'Users not found' });
          return;
        }

        const usersObject = user.reduce((acc: any, user: any) => {
          acc[user.id] = user;
          return acc;
        }, {});

        res.status(200).json({
          user: usersObject,
          limit: limit,
        });
      }
      // Optionally, you could add role-based checks here
      // if (user.role !== 'admin') {
      //   res.status(403).json({ message: 'Forbidden' });
      //   return;
      // }

      // const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit to 10
      // const attributes = [
      //   'id',
      //   'firstName',
      //   'lastName',
      //   'username',
      //   'imageURL',
      //   'avatarUrl',
      //   'profilePic',
      //   'bio',
      // ];
    );
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// ** Get user by ID
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

        const users_id = decodedToken.id;
        if (!users_id) {
          res
            .status(400)
            .json({ message: 'User ID (decodedToken) is required' });
          return;
        }

        if (users_id !== users_id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        const requestedUserId =
          parseInt(req.query.requestedUserId as string, 10) || 10;

        const user = await Users.findByPk(requestedUserId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        res.status(200).json({
          user,
          users_id: users_id,
          user_id: users_id,
        });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ** Update user
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

// ** Get user for post view by ID
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

// ** Get user data by ID
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

        const users_id = decodedToken.id;
        if (!users_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }
        // Validate and parse parameters
        let post_id, creator_id, user_id;
        try {
          ({ post_id, creator_id, user_id } = validateAndParseParams(req));
        } catch (error: any) {
          res.status(400).json({ message: error.message });
          return;
        }

        const user = await Users.getUserByID(users_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const userPostData = await Users.getUserProfile(user_id || users_id);
        if (!user) {
          res.status(404).json({ message: 'user profile not found' });
          return;
        }

        if (user.id !== users_id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        res.status(200).json({
          user_id,
          post,
          creator_id,
          user,
          userPostData,
        });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ** Get current user
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

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(400).json({ message: 'User not found' });
          return;
        }

        if (user.id !== user_id) {
          res
            .status(403)
            .json({ message: 'Unauthorized attempt! User id do not match.' });
          return;
        }

        res.status(200).json({
          user,
          user_id,
        });
      }
    );
  } catch (error: any) {
    console.error('Error in getCurrentUser:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// ** Fetch users for home story view with limit and offset
export const fetchUsersForHomeStory = async (req: Request, res: Response) => {
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

        const users_id = decodedToken.id;
        if (!users_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit to 10
        const offset = parseInt(req.query.offset as string, 10) || 0; // Default offset to 0

        try {
          const user = await Users.findAll({
            where: {
              id: {
                [Op.ne]: users_id,
              },
            },
            limit: limit,
            offset: offset,
          });

          if (!user) {
            res.status(404).json({ message: 'Users not found' });
            return;
          }

          if (!user || user.length === 0) {
            res.status(404).json({ message: 'Users not found' });
            return;
          }

          const usersObject = user.reduce((acc: any, user: any) => {
            acc[user.id] = user;
            return acc;
          }, {});

          res.status(200).json({
            user: usersObject,
            limit: limit,
            offset: offset,
          });
        } catch (dbError) {
          console.error('Error getting all users:', dbError);
          res.status(500).json({ message: 'Internal server error!' });
        }
      }
    );
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal server error!' });
  }
};
