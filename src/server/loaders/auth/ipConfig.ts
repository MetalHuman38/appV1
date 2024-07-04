import rateLimit from 'express-rate-limit';
import { env } from '../../config/index';
import { Request, Response } from 'express';

export const keyGenerator = async (
  req: Request,
  res: Response
): Promise<string> => {
  if (!req.ip) {
    res.status(500).send({ message: 'Warning: request.ip is missing!' });
    return req.socket.remoteAddress!;
  }

  return req.ip.replace(/:\d+[^:]*$/, '');
};

export const limiter = rateLimit({
  windowMs: env.RARE_LIMIT_WINDOW_MS,
  max: env.MAX,
  message: env.RARE_LIMIT_MESSAGE,
  statusCode: env.RARE_LIMIT_CODE,
  handler: (_req: Request, res: Response) => {
    res.status(env.RARE_LIMIT_CODE).json({
      message: env.RARE_LIMIT_MESSAGE,
    });
  },
  keyGenerator,
});

export default {
  limiter,
  keyGenerator,
};
