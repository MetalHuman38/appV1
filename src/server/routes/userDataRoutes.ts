import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { getUserDataByID } from '../controllers/userController';

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

// ** current user datas(post, likes, user_id)
router.get('/api/getUserData', getUserDataByID);

export default router;
