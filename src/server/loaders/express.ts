import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import path from 'path';
import { env } from '../config/index';
import { jwtENV } from '../config/jwtENV';
import { Likes, Posts, Users } from '../models/index.model';
import { router } from '../routes/router';
import { globalErrorHandler } from '../utils/errorHandler';
import { validateAndParseParams } from '../utils/validateAndParseParams';
import { limiter } from './auth/ipConfig';
import { verifyUser } from './auth/userAuth';

export default async function ({ app }: { app: Express }) {
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    return next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  // Serve static files from 'dist' directory
  app.use(express.static(path.join(__dirname, 'dist')));

  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  const Trust_Proxy = env.TRUST_PROXY || 'false';
  const numberOfProxies = env.NUMBER_OF_PROXIES || 1;
  if (Trust_Proxy) {
    app.set('trust proxy', true);
  } else if (Trust_Proxy === 'false') {
    app.set('trust proxy', false);
  } else {
    app.set('trust proxy', Trust_Proxy);
    app.set('trust proxy', numberOfProxies);
  }
  app.set('trust proxy', numberOfProxies);

  app.get('/ip', (request, response) => response.send(request.ip));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(morgan(env.MORGAN));

  app.use(limiter);

  app.use(router);

  app.use(globalErrorHandler);

  app.get('/api/getCurrentUser', verifyUser, async (req, res) => {
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
            console.log('JWT verification error', err.message);
            res.status(401).json({ message: 'Unauthorized Invalid Token' });
            return;
          }

          const user_id = decodedToken.id;
          if (!user_id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
          }

          try {
            const user = await Users.findOne({
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
                    'likes_count',
                    'created_At',
                  ],
                },
                {
                  model: Likes,
                  attributes: ['id', 'user_id', 'post_id', 'created_At'],
                },
              ],
            });
            if (!user) {
              res
                .status(400)
                .json({ message: 'User ID is required user routes' });
              return;
            }

            if (user_id !== user_id) {
              res.status(401).json({ message: 'Unauthorized' });
              return;
            }

            // Validate and parse parameters
            let post_id, likes_id, creator_id;
            try {
              ({ post_id, likes_id, creator_id } = validateAndParseParams(req));
            } catch (error: any) {
              res.status(400).json({ message: error.message });
              return;
            }

            const post =
              creator_id !== undefined
                ? await Posts.findOne({
                    where: { creator_Id: creator_id },
                    include: [
                      {
                        model: Users,
                        attributes: [
                          'id',
                          'firstName',
                          'lastName',
                          'username',
                          'email',
                          'bio',
                          'status',
                          'join',
                          'avatarUrl',
                          'imageURL',
                          'profilePic',
                          'label',
                          'last_activity',
                          'updated_at',
                          'UserRegistrationID',
                        ],
                      },
                    ],
                  })
                : null;

            if (!post) {
              res.status(400).json({ message: 'Post ID is required in posts' });
              return;
            }

            // const post = await Posts.getPostByReferenceID(user_id);
            // if (!post) {
            //   res.status(400).json({ message: 'Post ID is required in posts' });
            //   return;
            // }

            const userLikes = await Likes.findByPk(user_id);
            if (!userLikes) {
              res
                .status(400)
                .json({ message: 'User ID is required likes routes' });
              return;
            }

            res.status(200).json({
              user,
              post,
              userLikes,
              userId: user_id,
              creator_Id: creator_id,
              post_id: post_id,
              likes_id: likes_id || userLikes.id,
            });
          } catch (error) {
            throw new Error(error as string);
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: 'User ID is required' });
    }
  });

  return app;
}
