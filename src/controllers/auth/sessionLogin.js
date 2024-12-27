/**
 * @file controller/auth/sessionLogin.js
 * @description This controller handles the session-based login using Passport's Local strategy. It uses the
 * `passport.authenticate` method to authenticate the user based on email and password. If successful, it
 * creates a session and logs the user in. If an error occurs, it passes the error to the next middleware.
 *
 * @module sessionLoginUser
 */

import passport from 'passport';

/**
 * Logs in a user based on credentials using Passport's local strategy. If successful, a session is created
 * for the user, and a success message is returned. If authentication fails, an error response is returned.
 *
 * @async
 * @function sessionLoginUser
 * @param {object} req - The request object containing the user's login credentials (email, password).
 * @param {object} res - The response object used to send success or error messages.
 * @param {function} next - The next middleware function to pass errors to.
 * @returns {object} A JSON response with a success message or an error message.
 * @throws {Error} Passes any errors to the next middleware in the authentication process.
 *
 * @example
 * // Example of a successful login response:
 * // res.json({ message: 'Login successful' });
 *
 * // Example of an error response (if invalid credentials):
 * // res.status(401).json({ error: 'Invalid credentials' });
 */
export const sessionLoginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err); // Pass any errors to the next middleware
    if (!user) return res.status(401).json({ error: 'Invalid credentials' }); // Return error if no user found

    req.login(user, (err) => {
      if (err) return next(err); // Pass login errors to the next middleware
      return res.json({ message: 'Login successful' }); // Return success message if login is successful
    });
  })(req, res, next);
};
