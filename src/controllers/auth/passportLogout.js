/**
 * @file controller/auth/passportLogout.js
 * @description This controller handles the logout process for a user. It uses Passport's logout
 * method to clear the user's session and cookies, ensuring that the user is fully logged out of the
 * system. If there is any issue during the process, an appropriate error response is sent.
 *
 * @module passportLogout
 */

import logger from '../../utils/logger.js';

/**
 * Logout the user by destroying their session and clearing their cookies.
 *
 * This function calls Passport's `logout` method to log the user out and then destroys the session,
 * clears the session cookie, and sends a success message. If any error occurs during the logout process,
 * an error message is returned.
 *
 * @async
 * @function passportLogout
 * @param {object} req - The request object representing the user's session.
 * @param {object} res - The response object used to send the logout success or error message.
 * @returns {object} A JSON response confirming the user has logged out successfully.
 * @throws {Error} Throws an error if there is an issue during the logout process.
 * @example
 * // Example of a successful logout response:
 * // res.json({ message: 'Successfully logged out' });
 *
 * // Example of an error response:
 * // res.status(500).json({ message: 'Error logging out' });
 */
export const passportLogout = async (req, res) => {
  try {
    // Attempt to logout using Passport's logout method.
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' }); // Error if logout fails.
      }
      // Destroy the session and clear the session cookie after successful logout.
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Clear session cookie.
        res.json({ message: 'Successfully logged out' }); // Send success response.
      });
    });
  } catch (error) {
    logger.error(error); // Log error for debugging purposes.
    res.status(500).json({ error: 'Internal server error' }); // Send internal server error response.
  }
};
