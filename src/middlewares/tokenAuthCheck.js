/**
 * @file tokenAuthCheck.js
 * @description This middleware checks the validity of the JSON Web Token (JWT) in the Authorization header.
 * It verifies the token using a secret key and attaches the decoded user information to the request object if valid.
 * If the token is missing or invalid, it returns an appropriate error response.
 */

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

/**
 * Middleware to authenticate the user using a JWT passed in the Authorization header.
 * It extracts the token, verifies it, and attaches the decoded user information to the request object.
 * If the token is not present or invalid, it sends a 401 or 400 response accordingly.
 *
 * @param {Object} req - The request object from Express, representing the HTTP request.
 * @param {Object} res - The response object from Express, used to send the response back to the client.
 * @param {Function} next - The next middleware function in the Express stack, which is called if the token is valid.
 *
 * @returns {void} If the token is valid, the middleware calls `next()` to pass control to the next handler.
 *                  If the token is missing or invalid, it sends a `401 Unauthorized` or `400 Bad Request` response.
 */
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if the token exists in the Authorization header
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the token using JWT_SECRET
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails, send a 400 Bad Request response
    res.status(400).send('Invalid Token');
  }
};

export default authenticate;
