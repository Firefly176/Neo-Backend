/**
 * @file initializeMiddleware.js
 * @description Sets up and configures essential middleware for the Express application, including CORS, security headers, logging, and error handling.
 */

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import corsOptions from '../config/corsOptions.js';
import { errorHandler } from './errorHandler.js';

/**
 * Initializes and configures global middleware for the Express application.
 *
 * @function initializeMiddleware
 * @param {object} app - The Express application instance.
 *
 * @example
 * // Example usage in an Express application
 * import express from 'express';
 * import { initializeMiddleware } from './middlewares/appInitializingMiddlewares.js';
 * const app = express();
 * initializeMiddleware(app);
 */
export const initializeMiddleware = (app) => {
  /**
   * Enables Cross-Origin Resource Sharing (CORS) based on provided options.
   * @see {@link https://www.npmjs.com/package/cors|cors}
   */
  app.use(cors(corsOptions));

  /**
   * Sets HTTP headers for security purposes.
   * @see {@link https://www.npmjs.com/package/helmet|helmet}
   */
  app.use(helmet());

  /**
   * Logs HTTP requests in development mode.
   * @see {@link https://www.npmjs.com/package/morgan|morgan}
   */
  app.use(morgan('dev'));

  /**
   * Parses incoming JSON requests and populates req.body with parsed data.
   */
  app.use(express.json());

  /**
   * Parses URL-encoded data with querystring library when extended is false, and populates req.body with parsed data.
   */
  app.use(express.urlencoded({ extended: true }));

  /**
   * Custom error handling middleware that catches and processes errors.
   * @function errorHandler
   * @see {@link ./errorHandler.js}
   */
  app.use(errorHandler);
};
