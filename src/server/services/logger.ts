import winston, { createLogger } from 'winston';

const { combine, timestamp, prettyPrint, errors } = winston.format;

// ** Define custom log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}] : ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
  }
);

// ** Create the logger instance
const logger = createLogger({
  level: 'info', // ** Set the logging level (e.g., 'info', 'warn', 'error')
  format: combine(
    errors({ stack: true }),
    timestamp(),
    logFormat,
    prettyPrint()
  ), // ** Set the log format
  transports: [
    new winston.transports.Console(), // ** Log to the console
    new winston.transports.File({ filename: 'combined.log', level: 'info' }), // ** Log all levels to a file
  ],
});

const requestLog = { method: 'GET' };

const childLogger = logger.child({ requestLog });
childLogger.info('Request Log Details =>');
childLogger.error('Error =>', new Error('500 internal server error'));

// ** Export the logger instance
export default { logger };
