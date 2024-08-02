import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import {
  fetchUsersForHomeStory,
  getAllUsers,
  getCurrentUser,
  getUserByID,
  updateUser,
} from '../controllers/userController';
import { verifyUser } from '../loaders/auth/userAuth';
// import { verifyUser } from '../loaders/auth/userAuth';
// import { Likes, Posts, Users } from '../models/index.model';
// import { validateAndParseParams } from '../utils/validateAndParseParams';

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

router.get('/api/getCurrentUser', verifyUser, getCurrentUser);

// Get all users
router.get('/api/getAllUsers', getAllUsers);

// Get user by ID
router.get('/api/getUserByID', getUserByID);

// Update user by ID
router.put('/api/updateUser', updateUser);

// ** fetch users for the home page
router.get('/api/fetchUsers', fetchUsersForHomeStory);

export default router;
