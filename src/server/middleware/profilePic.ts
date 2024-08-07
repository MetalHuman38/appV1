import { Request, Response } from 'express'; // Import the Request and Response types from express
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { validateMIMEType } from 'validate-image-type';
import ProfilePictures from '../models/profilePic.model';
import Users from '../models/user.model';

// Define custom destination directory
const uploadDir = '/home/bkalejaiye/appV-1/public/assets/images';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Check file type
const validateMimeType = async (file: any, cb: any) => {
  try {
    const validationResult = await validateMIMEType(file.path, {
      originalFilename: file.originalname,
      allowMimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
    });

    if (!validationResult.ok) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  } catch (error) {
    console.error('Error validating file type:', error);
    cb(new Error('Error validating file type'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (_req, file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    validateMimeType(file.path, cb);
  },
});

const uploadMiddleware = async (req: Request, res: Response, next: any) => {
  try {
    if (req.file) {
      console.log('File uploaded:', req.file);
      const imagePath = req.file.path;
      console.log('Image Path:', imagePath);
      const imageUrl = path.join('assets/images', req.file.filename);
      console.log('Image URL:', imageUrl);

      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (err: any, decodedToken: any) => {
          if (err) {
            console.log(err.message);
            return res.status(401).json({ message: 'Unauthorized' });
          }

          const user_id = decodedToken.id;

          const user = await Users.findByPk(user_id);

          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          try {
            const imageRecord = await ProfilePictures.create({
              user_id: user_id,
              profilePic: imageUrl,
              created_At: new Date(),
              updated_At: new Date(),
            });

            if (!imageRecord) {
              res.status(500).send({ error: 'Error creating image record' });
              return;
            }

            await user.update({ profilePic: imageUrl });
            // Send ImageUrl to the request body

            req.body.imageid = imageRecord.user_id;

            console.log('Image ID:', imageRecord.user_id);

            res.status(201).send({ imageUrl });

            console.log('Image record created:', imageRecord);
          } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ message: 'Error retrieving user' });
          }
          return next();
        }
      );
    } else {
      res.status(400).send({ error: 'No File Uploaded!' });
    }
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).send({ error: 'Error uploading image from server 500' });
  }
  return next();
};

export { upload, uploadMiddleware };
