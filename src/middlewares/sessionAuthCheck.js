/**
 * @file sessionAuthCheck.js
 * @description This middleware checks if the user is authenticated by verifying the session.
 * It uses Passport's `isAuthenticated` method to ensure the user has a valid session before allowing access to protected routes.
 */

/**
 * Middleware to check if the user is authenticated.
 * If the user is authenticated, the middleware allows the request to proceed to the next handler.
 * If the user is not authenticated, a 401 Unauthorized response is returned.
 *
 * @param {Object} req - The request object from Express, representing the HTTP request.
 * @param {Object} res - The response object from Express, used to send the response back to the client.
 * @param {Function} next - The next middleware function in the Express stack, which is called if the user is authenticated.
 *
 * @returns {void} If the user is authenticated, the middleware calls `next()` to pass control to the next handler.
 *                  If the user is not authenticated, a 401 Unauthorized response is sent.
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Proceed to the next handler if the user is authenticated
  }
  return res.status(401).json({ message: 'Unauthorized' }); // Respond with an Unauthorized status if not authenticated
};
