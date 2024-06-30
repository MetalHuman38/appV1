import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ImageStorage from '../models/image.model';
import Users from '../models/user.model';
import { jwtENV } from '../config/jwtENV';
import Posts from '../models/post.model';
import getImagePreviewUrl from './imageController';
import Likes from '../models/likePost.model';
import Saves from '../models/savePost.model';
import { Op } from 'sequelize';

dotenv.config();
// Create Post Method - Create a new post
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

export const deleteFile = async (
  _req: Request,
  res: Response,
  imageUrl: string,
): Promise<void> => {
  try {
    const image = await ImageStorage.findOne({ where: { imageUrl: imageUrl } });

    if (!image) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }

    await image.destroy();
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Post Method - Update a post
export const updatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { caption, location, tags, imageUrl: newImageUrl } = req.body;

    const post_id = parseInt(req.query.post_id as string, 10);

    if (!post_id) {
      res.status(400).json({ message: 'Post ID is required' });
      return;
    }

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

        const post = await Posts.findOne({
          where: { id: post_id, creator_Id: user_id },
        });
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        if (post.creator_Id !== user.id) {
          res.status(403).json({ message: 'Unauthorized attempt!' });
          return;
        }

        let imageUrl = post?.imageURL;

        if (newImageUrl) {
          try {
            const previewImageUrl = await getImagePreviewUrl(req, res);
            if (!previewImageUrl) {
              res.status(404).json({ message: 'Image not found' });
              return;
            }
            imageUrl = previewImageUrl;
          } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
          }
        }

        const updatedPost = await post.update({
          id: post.id,
          caption: caption,
          imageURL: imageUrl,
          location: location,
          tags: tags,
          created_At: new Date(),
        });
        if (!updatedPost) {
          if (newImageUrl) {
            await deleteFile(req, res, newImageUrl); // Ensure deleteFile is defined elsewhere
          }
          res.status(400).json({ message: 'Error updating post' });
          return;
        }

        res
          .status(200)
          .json({ message: 'Post updated successfully', post: updatedPost });
        return updatedPost;
      },
    );
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all posts
export const getAllPosts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          as: 'User',
          attributes: [
            'id',
            'username',
            'email',
            'profilePic',
            'bio',
            'firstName',
            'lastName',
            'imageURL',
            'avatarUrl',
          ],
        },
      ],
    });
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to like a post by user
export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
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

        const user_id = decodedToken.id;

        const post_id = parseInt(req.body.post_id as string, 10);

        if (isNaN(post_id)) {
          res.status(400).json({ message: 'Invalid post ID' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const existingLike = await Likes.findOne({
          where: { post_id, user_id },
        });
        if (existingLike) {
          res.status(400).json({ message: 'Post already liked' });
          return;
        }

        const newLike = await Likes.createLike({
          user_id,
          post_id,
          created_At: new Date(),
        });

        if (!post.likes_Count) {
          post.likes_Count = 0;
        }
        const likesCount = post.likes_Count + 1;

        const updatedPost = await post.update({ likes_Count: likesCount });
        if (!updatedPost) {
          res.status(400).json({ message: 'Error liking post.' });
          return;
        }

        res
          .status(201)
          .json({ message: 'Post liked successfully', like: newLike });
      },
    );
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get post by ID
export const getPostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
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

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const post_id = parseInt(req.query.post_id as string, 10);

        if (!post_id) {
          res.status(400).json({ message: 'Post ID is required' });
          return;
        }

        const post = await Posts.findOne({
          where: { id: post_id, creator_Id: user_id },
        });
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        res.status(200).json({ post });
      },
    );
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// toggle likes
export const deleteLikedPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
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

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }
        const post_id = parseInt(req.body.post_id as string, 10);

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post = await Posts.findByPk(post_id);

        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const existingLike = await Likes.findOne({
          where: { post_id: post_id, user_id: user_id },
        });
        if (existingLike) {
          await existingLike.destroy();
        }

        let currentLikes = post.likes_Count || 0;
        if (currentLikes > 0) {
          currentLikes -= 1;
        }

        await post.update({ likes_Count: currentLikes });

        await post.save();
        res.status(200).json({
          message: existingLike
            ? 'Like removed successfully'
            : 'Post liked successfully',
          post,
        });
      },
    );
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Function to save a post by user
export const savePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('JWT verification error', err.message);
          res.status(401).json({ message: 'Unauthorized Invalid Token' });
          return;
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const post_id = parseInt(req.body.post_id as string, 10);

        if (!post_id) {
          res.status(400).json({ message: 'Post ID is required' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const existingSave = await Saves.findOne({
          where: { post_id, user_id },
        });
        if (existingSave) {
          res.status(400).json({ message: 'Post already saved' });
          return;
        }

        const newSave = await Saves.createSave({
          id: user_id,
          user_id,
          post_id,
          saveDate: new Date(),
        });
        if (!newSave) {
          res.status(400).json({ message: 'Error saving post.' });
          return;
        }
        res
          .status(201)
          .json({ message: 'Post saved successfully', save: newSave });
      },
    );
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a saved post by user
export const deleteSavedPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('JWT verification error', err.message);
          res.status(401).json({ message: 'Unauthorized Invalid Token' });
          return;
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const post_id = parseInt(req.body.post_id as string, 10);

        if (!post_id) {
          res.status(400).json({ message: 'Post ID is required' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const existingSave = await Saves.findOne({
          where: { post_id, user_id },
        });
        if (existingSave) {
          await existingSave.destroy();
        }

        res.status(200).json({
          message: existingSave
            ? 'Post unsaved successfully'
            : 'Post not saved',
        });
      },
    );
  } catch (error) {
    console.error('Error deleting saved post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all saved posts by user
export const getSavedPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('JWT verification error', err.message);
          res.status(401).json({ message: 'Unauthorized Invalid Token' });
          return;
        }

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const savedPosts = await Saves.getSavedPosts(user_id);
        res.status(200).json({
          savedPosts,
        });
      },
    );
  } catch (error) {
    console.error('Error getting saved posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a post -
export const deletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

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

        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        const post_id = parseInt(req.body.post_id as string, 10);

        if (!post_id) {
          res.status(400).json({ message: 'Post ID is required from server' });
          return;
        }

        const post = await Posts.findByPk(post_id);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const existingSave = await Saves.findOne({
          where: { post_id, user_id },
        });
        if (existingSave) {
          await existingSave.destroy();
        }

        // Find associated images and delete them
        if (post.imageURL) {
          const image = await ImageStorage.findOne({
            where: { imageUrl: post.imageURL },
          });
          if (image) {
            await image.destroy();
          }
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
      },
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all infinite posts
export const getInfinitePosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page = 0, limit = 10 } = req.query;
    const offset = page
      ? parseInt(page as string, 10) * parseInt(limit as string, 10)
      : 0;
    const posts = await Posts.findAndCountAll({
      limit: parseInt(limit as string, 10),
      offset,
      order: [['created_At', 'DESC']],
    });
    res.status(200).json({
      posts,
      page: parseInt(page as string, 10),
      totalPages: Math.ceil(posts.count / parseInt(limit as string, 10)),
      totalCount: posts.count,
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Search posts
// export const searchPosts = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { searchValue } = req.body;
//     if (!searchValue) {
//       res.status(400).json({ message: 'Search value is required' });
//       return;
//     }

//     const posts = await Posts.findAll({
//       where: {
//         caption: {
//           [Op.like]: `%${searchValue}%`,
//         },
//       },
//     });
//     res.status(200).json({
//       posts,
//     });
//   } catch (error) {
//     console.error('Error searching posts:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Get user's posts

export const searchPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { searchValue } = req.body;
    if (!searchValue) {
      res.status(400).json({ message: 'Search value is required' });
      return;
    }

    const posts = await Posts.findAll({
      where: {
        [Op.or]: [
          {
            caption: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            tags: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            location: {
              [Op.like]: `%${searchValue}%`,
            },
          },
        ],
      },
    });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log('JWT verification error', err.message);
          res.status(401).json({ message: 'Unauthorized Invalid Token' });
          return;
        }
        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(400).json({ message: 'User ID is required' });
          return;
        }
        const posts = await Posts.findAll({
          where: { creator_Id: user_id },
        });
        res.status(200).json({ posts });
      },
    );
  } catch (error) {
    console.error('Error getting user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Popular Posts
export const getPopularPosts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const popularPosts = await Posts.findAll({
      order: [['likes_Count', 'DESC']],
    });
    res.status(200).json({ popularPosts });
  } catch (error) {
    console.error('Error getting popular posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
