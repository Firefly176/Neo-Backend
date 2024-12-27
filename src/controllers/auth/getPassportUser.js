/**
 * @file controller/auth/getPassportUser.js
 * @description This controller handles the route to fetch the currently authenticated user
 * through Passport.js. It checks if the user is authenticated and returns the user data
 * if authenticated. If the user is not authenticated, it responds with an error message.
 */

import logger from '../../utils/logger.js';

/**
 * Get the currently authenticated user.
 *
 * This function checks if the user is authenticated via Passport.js. If authenticated,
 * it returns the user object. If not authenticated, it sends a 401 Unauthorized response.
 * In case of an error during the process, a 500 Internal Server Error response is sent.
 *
 * @async
 * @function getPassportUser
 * @param {object} req - The request object from the client, containing authentication status.
 * @param {object} res - The response object used to send back data or error messages.
 * @returns {object} A JSON response with user data if authenticated, or an error message.
 * @throws {Error} Throws an error if there is a failure during the authentication check.
 * @example
 * // Example of a successful response:
 * // res.status(200).json(req.user);
 *
 * // Example of an error response:
 * // res.status(401).json({ message: 'Not authenticated' });
 */
export const getPassportUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user); // User is authenticated, return user data.
    } else {
      return res.status(401).json({ message: 'Not authenticated' }); // User is not authenticated, send error.
    }
  } catch (error) {
    logger.error(error); // Log the error
    res.status(500).json({ error: 'Internal server error' }); // Send 500 server error if something goes wrong.
  }
};
