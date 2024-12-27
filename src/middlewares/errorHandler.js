/**
 * @file errorHandler.js
 * @description This middleware is responsible for handling errors in the application. It catches all errors thrown within the application and responds with an appropriate error message and status code.
 */

import logger from '../utils/logger.js';

/**
 * Global error handler middleware for handling uncaught errors.
 * Logs the error details and sends a JSON response to the client with the error message and status code.
 * If no specific status is provided, it defaults to a 500 Internal Server Error.
 *
 * @param {Error} err - The error object containing error details.
 * @param {Object} req - The request object from Express, representing the HTTP request.
 * @param {Object} res - The response object from Express, used to send the response back to the client.
 * @param {Function} next - The next middleware function in the Express stack.
 *
 * @returns {void} The middleware sends an error response and does not call the next middleware.
 */
const errorHandler = (err, req, res, next) => {
  logger.error(err); // Logs the error for debugging purposes
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

export { errorHandler };
