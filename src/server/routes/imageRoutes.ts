import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { corOptions } from '../config/corOptions';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import upload from '../services/multer.config';
import getImagePreviewUrl from '../controllers/imageController';
import ImageStorages from '../models/image.model';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model';
import { jwtENV } from '../config/jwtENV';

dotenv.config();

const router = express.Router();

// Enable CORS for all routes
router.use(cors(corOptions));

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('encoding', 'multipart/form-data');
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());
router.use(bodyParser.json());

router.post('/api/uploadImage', upload.single('image'), async (req, res) => {
  try {
    console.log('File uploaded:', req.file);
    // Modify the file path to the required format
    const relativePath = `assets/images/${req.file?.filename}`;

    const token = req.cookies.jwt;

    const post_id = parseInt(req.body.postId as string, 10);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    jwt.verify(
      token,
      jwtENV.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }
        const user_id = decodedToken.id;
        if (!user_id) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }
        const user = await Users.findByPk(user_id);
        if (!user) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const imageRecord = await ImageStorages.create({
          imageUrl: relativePath,
          user_id: user_id || null,
          post_id: post_id || null,
          created_At: new Date(),
        });

        if (!imageRecord) {
          res.status(500).send({ error: 'Error creating image record' });
          return;
        }
        res.status(200).json({
          message: 'Image uploaded successfully',
          imageUrl: relativePath,
        });
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/api/sendImageUrl', getImagePreviewUrl);

export default router;
