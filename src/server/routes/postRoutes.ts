import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import {
  createPost,
  deleteLikedPost,
  deletePost,
  deleteSavedPost,
  getAllPosts,
  getInfinitePosts,
  getLikedPosts,
  getPopularPosts,
  getPostById,
  getSavedPosts,
  getUserPosts,
  likePost,
  savePost,
  searchPosts,
  updatePost,
} from '../controllers/PostController';
import { verifyUser } from '../loaders/auth/userAuth';
import { Saves } from '../models/index.model';

const router = express.Router();

router.use(cors());

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

// Create a new post
router.post('/api/createPost', createPost);

// Update a post
router.put('/api/updatePost', updatePost);

// delete a post
router.delete('/api/deletePost', deletePost);

// Get Recent Posts
router.get('/api/getAllPosts', getAllPosts);

// Get post by ID
router.get('/api/getPostById', verifyUser, getPostById);

// Like a Post
router.post('/api/likePost', likePost);

// ** get liked posts
router.get('/api/getLikedPosts', verifyUser, getLikedPosts);

// Save a Post
// router.post('/api/savePost', verifyUser, savePost);
router.post('/api/savePost', verifyUser, savePost, async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    await Saves.create({
      user_id,
      post_id,
    });
    res.status(200).send('Post saved');
  } catch (error: any) {
    if (
      error.name === 'SequelizeUniqueConstraintError' ||
      error.code === 'ER_DUP_ENTRY'
    ) {
      res.status(400).json({ message: 'Post already saved by this user' });
    }
    console.error('Error saving post:', error);
    res.status(500).send('Error saving post');
  }
});

// get saved posts
router.get('/api/getSavedPosts', verifyUser, getSavedPosts);

// Delete a Post
router.delete('/api/deleteSavedPost', deleteSavedPost);

// Delete a like
router.delete('/api/deleteLikePost', deleteLikedPost);

// Get Infinite Posts
router.get('/api/getInfinitePosts', getInfinitePosts);

// Search Posts
router.post('/api/searchPosts', searchPosts);

// Get user's saved posts
router.get('/api/getUserPosts', getUserPosts);

// Get popular posts
router.get('/api/getPopularPosts', getPopularPosts);

export default router;
