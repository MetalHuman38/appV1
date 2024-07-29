import { Request, Response } from 'express';

// Helper function to validate and parse query parameters
export function validateAndParseParams(req: Request): {
  user_id?: number;
  post_id?: number;
  likes_id?: number;
  creator_id?: number;
  requestedUserId?: number;
  limit?: number;
} {
  // Extract query parameters
  const { user_id, post_id, likes_id, creator_id, requestedUserId, limit } =
    req.query;

  // Validate presence of required parameters
  if (user_id === undefined) {
    throw new Error('user_id is required');
  }

  if (post_id === undefined) {
    throw new Error('post_id is required');
  }

  // Parse parameters
  const parsedUserId =
    user_id !== undefined ? parseInt(user_id as string, 10) : undefined;
  const parsedPostId =
    post_id !== undefined ? parseInt(post_id as string, 10) : undefined;
  const parsedLikesId =
    likes_id !== undefined ? parseInt(likes_id as string, 10) : undefined;
  const parsedCreatorId =
    creator_id !== undefined ? parseInt(creator_id as string, 10) : undefined;
  const parsedRequestedUserId =
    requestedUserId !== undefined
      ? parseInt(requestedUserId as string, 10)
      : undefined;
  const parsedLimit =
    limit !== undefined ? parseInt(limit as string, 10) : undefined;

  // Debugging logs
  console.log('Received parameters:', {
    user_id,
    post_id,
    likes_id,
    creator_id,
    requestedUserId,
    limit,
  });
  console.log('Parsed parameters:', {
    parsedUserId,
    parsedPostId,
    parsedLikesId,
    parsedCreatorId,
    parsedRequestedUserId,
    parsedLimit,
  });

  if (isNaN(parsedUserId ?? 0)) {
    throw new Error('user_id must be a number');
  }
  if (isNaN(parsedPostId ?? 0)) {
    throw new Error('post_id must be a number');
  }
  if (isNaN(parsedLikesId ?? 0)) {
    throw new Error('likes_id must be a number');
  }

  if (isNaN(parsedCreatorId ?? 0)) {
    throw new Error('creator_id must be a number');
  }

  if (isNaN(parsedRequestedUserId ?? 0)) {
    throw new Error('requestedUserId must be a number');
  }
  if (isNaN(parsedLimit ?? 0)) {
    throw new Error('limit must be a number');
  }

  // Additional checks and error handling
  if (
    (parsedUserId !== undefined && parsedUserId < 0) ||
    (parsedPostId !== undefined && parsedPostId < 0) ||
    (parsedLikesId !== undefined && parsedLikesId < 0) ||
    (parsedCreatorId !== undefined && parsedCreatorId < 0) ||
    (parsedRequestedUserId !== undefined && parsedRequestedUserId < 0) ||
    (parsedLimit !== undefined && parsedLimit < 0)
  ) {
    throw new Error(
      'Invalid query parameters: post_id, likes_id, and creator_id must be non-negative'
    );
  }

  return {
    user_id: parsedUserId,
    post_id: parsedPostId,
    likes_id: parsedLikesId,
    creator_id: parsedCreatorId,
    requestedUserId: parsedRequestedUserId,
    limit: parsedLimit,
  };
}

export function mustFind<T>(arr: Array<T>, predicate: (t: T) => boolean): T {
  const found = arr.find(predicate);
  if (!found) {
    throw new Error(`Could not find item with id ${predicate}`);
  }
  return found;
}

// Validation middleware
export function validateUserCreation(req: Request, res: Response): any {
  const { name, username, email, password } = req.body;
  const errors: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  } = {};

  if (!name) errors.name = 'Name is required';
  if (!username) errors.username = 'Username is required';
  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  return {
    name,
    username,
    email,
    password,
  };
}

export default {
  validateAndParseParams,
  validateUserCreation,
};
