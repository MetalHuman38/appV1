import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { corOptions } from '../config/corOptions';
import { jwtENV } from '../config/jwtENV';
import * as adminController from '../loaders/admin/adminController';
import { isAdmin } from '../loaders/admin/founder';
import { jwtGenerator } from '../loaders/auth/jwtGenerator';
import UserRegistration from '../models/userRegister.model';
import { handleError } from '../utils/errorHandler';

const router = express.Router();

router.use(cors(corOptions));

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

// app.use(express.urlencoded({ extended: false }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

// Route to create a new user
router.post('/api/adminCreateUser', isAdmin, async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    if (!name || !username || !email || !password) {
      return handleError(new Error('New User validation error'), res);
    }
    // Check if user already exists
    const userExists = await UserRegistration.findOne({
      where: { email: email },
    });
    if (userExists) {
      return handleError(
        new Error('UserRegistrations.email: User already exists '),
        res
      );
    }
    const user = await UserRegistration.create({
      newUser: name,
      username: username,
      email: email,
      hashedpassword: password,
      createdAt: new Date(),
    });

    const token = jwtGenerator({ id: user.id });
    res.cookie('jwt', token, {
      httpOnly: jwtENV.JWT_HTTP_ONLY,
      maxAge: jwtENV.JWT_MAX_AGE * 1000,
      secure: jwtENV.JWT_SECURE,
      sameSite: 'lax',
    });
    res.status(201).json({
      id: user.id,
      name: user.newUser,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error: any) {
    handleError(error, res);
  }
});

// Route to login as an admin
router.post('/api/adminLogin', adminController.adminLogin);

export default router;
