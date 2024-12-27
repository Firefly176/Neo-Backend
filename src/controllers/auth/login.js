/**
 * @file controller/auth/login.js
 * @description This controller handles the user login process by verifying the user's credentials,
 * generating a JWT token if the credentials are valid, and returning the token to the client.
 * If the credentials are invalid or if there is an error during the process, an appropriate error
 * response is sent.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';

/**
 * Login the user by verifying the credentials and generating a JWT token.
 *
 * This function checks the provided email and password against the stored user data.
 * If valid, a JWT token is generated and returned. If invalid, a 401 Unauthorized
 * response is sent. In case of any errors, a 500 Internal Server Error is returned.
 *
 * @async
 * @function loginUser
 * @param {object} req - The request object, containing the user's email and password.
 * @param {object} res - The response object used to send back the authentication token or error messages.
 * @returns {object} A JSON response containing the authentication token if login is successful.
 * @throws {Error} Throws an error if there is an issue during the login process.
 * @example
 * // Example of a successful response:
 * // res.json({ token: 'jwt-token-here' });
 *
 * // Example of an error response (invalid credentials):
 * // res.status(401).json({ error: 'Invalid credentials' });
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body.
    const user = await prisma.user.findUnique({ where: { email } }); // Find user by email.

    // Check if the user exists and if the password is correct.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' }); // Invalid credentials response.
    }

    // Generate JWT token if credentials are valid.
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours.
    });

    res.json({ token }); // Send token in response.
  } catch (error) {
    logger.error(error); // Log error for debugging purposes.
    res.status(500).json({ error: 'Internal server error' }); // Send internal server error response.
  }
};
