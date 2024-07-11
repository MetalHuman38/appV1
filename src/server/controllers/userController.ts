import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtENV } from '../config/jwtENV';
import { Likes, Posts, ProfilePictures, Users } from '../models/index.model';

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
        const requestedUserId = parseInt(req.query.user_id as string, 10);

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
          res.status(400).json({ message: 'Post ID is required' });
          return;
        }

        const userLikes = await Likes.findByPk(user_id);
        if (!userLikes) {
          res.status(400).json({ message: 'User ID is required S routes' });
          return;
        }

        res.status(200).json({
          user,
          post,
          userLikes,
          user_id: user_id,
        });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user by ID
// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { profilePic: newImageUrl } = req.body;

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
//           return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const user_id = decodedToken.id;
//         if (!user_id) {
//           return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const user = await Users.findByPk(user_id);
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }

//         if (user.id !== user_id) {
//           return res.status(403).json({ message: 'Unauthorized attempt!' });
//         }

//         const { newUser, ...rest } = req.body;
//         if (Object.keys(rest).length === 0) {
//           return res.status(400).json({ message: 'No fields to update' });
//         }

//         if (newUser) {
//           const spaceIndex = newUser?.lastIndexOf(' ');
//           const firstName =
//             spaceIndex !== -1 ? newUser.slice(0, spaceIndex) : newUser;
//           const lastName =
//             spaceIndex !== -1 ? newUser.slice(spaceIndex + 1) : '';
//           rest.firstName = firstName;
//           rest.lastName = lastName;
//         }

//         let profilePic = user?.profilePic;

//         if (newImageUrl) {
//           try {
//             const previewImageUrl = await getProfilePicPreviewUrl(req, res);
//             if (!previewImageUrl) {
//               return res
//                 .status(404)
//                 .json({ message: 'preview Image not found' });
//             }
//             profilePic = previewImageUrl;
//           } catch (error) {
//             console.error('Error fetching image preview URL:', error);
//             return res.status(500).json({ message: 'Internal server error' });
//           }
//         }

//         const attributes = { ...rest, profilePic };

//         const [affectedCount, updatedUsers] = await Users.updateUser(
//           user_id,
//           attributes
//         );
//         if (affectedCount === 0) {
//           console.log('Error updating user:', updatedUsers);
//           return res.status(400).json({ message: 'Error updating user' });
//         }

//         res.status(200).json({ updatedUsers });
//       }
//     );
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Get user for post view by ID

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

        res.status(200).json({ user, post, userLikes, creator });
      }
    );
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
