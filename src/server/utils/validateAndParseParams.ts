import { Request } from 'express';

// Helper function to validate and parse query parameters
export function validateAndParseParams(req: Request): {
  post_id: number;
  likes_id?: number;
  creator_id?: number;
} {
  // Extract query parameters
  const { post_id, likes_id, creator_id } = req.query;

  // Parse parameters
  const parsedPostId =
    post_id !== undefined ? parseInt(post_id as string, 10) : undefined;
  const parsedLikesId =
    likes_id !== undefined ? parseInt(likes_id as string, 10) : undefined;
  const parsedCreatorId =
    creator_id !== undefined ? parseInt(creator_id as string, 10) : undefined;

  // Debugging logs
  console.log('Received parameters:', { post_id, likes_id, creator_id });
  console.log('Parsed parameters:', {
    parsedPostId,
    parsedLikesId,
    parsedCreatorId,
  });

  // Validate presence of parameters
  // Validate parsed values
  if (
    (post_id !== undefined &&
      parsedPostId !== undefined &&
      isNaN(parsedPostId)) ||
    (likes_id !== undefined &&
      parsedLikesId !== undefined &&
      isNaN(parsedLikesId)) ||
    (creator_id !== undefined &&
      parsedCreatorId !== undefined &&
      isNaN(parsedCreatorId))
  ) {
    throw new Error(
      'Invalid query parameters: post_id, likes_id, and creator_id must be numbers'
    );
  }

  // Additional checks and error handling
  if (
    (parsedPostId !== undefined && parsedPostId < 0) ||
    (parsedLikesId !== undefined && parsedLikesId < 0) ||
    (parsedCreatorId !== undefined && parsedCreatorId < 0)
  ) {
    throw new Error(
      'Invalid query parameters: post_id, likes_id, and creator_id must be non-negative'
    );
  }

  return {
    post_id: parsedPostId as number,
    likes_id: parsedLikesId as number,
    creator_id: parsedCreatorId as number,
  };
}

export default {
  validateAndParseParams,
};
