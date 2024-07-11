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

// Save a Post
router.post('/api/savePost', verifyUser, savePost);

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
