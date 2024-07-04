// src/errorHandler.ts
import process from 'node:process';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/index';

export const handleError = (
  err: Error & { code?: number; error?: [] },
  res: Response
): void => {
  console.error(err.message);

  // Initialize errors object
  let errors: { [key: string]: string } = {};

  // Handle specific errors cases
  if (err.message.includes('New User validation error')) {
    errors = {
      name: 'Name is required',
      username: 'username is required',
      email: 'email is required',
      password: 'password is required',
    };
  }

  if (err.message.includes('UserRegistrations.email')) {
    errors.email = 'Email is already registered';
  }

  if (err.message.includes('incorrect email')) {
    errors.email = 'email is not registered';
  }

  if (err.message.includes('Incorrect password')) {
    errors.password = 'password is incorrect';
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' && err.error) {
    errors = err.error.reduce((acc: { [key: string]: string }, error: any) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }

  res.status(err.code || 500).json({ errors });
};

// Function to log errors to a file
function logErrorToFile(err: Error) {
  const log = `${new Date().toISOString()} - ${err.message}\n${err.stack}\n`;
  fs.appendFileSync('error.log', log);
}

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  unhandledRejections.set(promise, reason);
});

process.on('rejectionHandled', promise => {
  unhandledRejections.delete(promise);
});

// Global error handling middleware for Express
export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  logErrorToFile(err);

  // Send generic error response
  res.status(500).json({
    message: 'An unexpected error occurred',
  });
  next(err);
}

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logErrorToFile(reason);
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logErrorToFile(err);
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception Origin: ${origin}\n`
  );
});

setTimeout(() => {
  console.log('This will still run.');
}, env.ERROR_TIMEOUT);

export default {
  globalErrorHandler,
  handleError,
};
