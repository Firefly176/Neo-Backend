/**
 * @file controller/auth/register.js
 * @description This controller handles the user registration process. It checks if the email is already
 * registered, hashes the password before storing it in the database, and returns a JWT token for the newly
 * registered user. If an error occurs during the registration, an appropriate error response is sent.
 *
 * @module registerUser
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../../utils/logger.js';
import prisma from '../../db/index.js';

/**
 * Registers a new user by validating the email, hashing the password, and storing the user's data
 * in the database. After successful registration, a JWT token is generated for the new user.
 *
 * @async
 * @function registerUser
 * @param {object} req - The request object containing user registration data.
 * @param {object} res - The response object used to send the registration success or error message.
 * @returns {object} A JSON response containing the JWT token for the newly registered user.
 * @throws {Error} Throws an error if there's an issue with the registration process (e.g., database error).
 * @example
 * // Example of a successful registration response:
 * // res.status(201).json({ token: 'your-jwt-token' });
 *
 * // Example of an error response (if email is already registered):
 * // res.status(400).json({ error: 'Email already registered' });
 *
 * // Example of a general error response:
 * // res.status(500).json({ error: 'Internal server error' });
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered.
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password before saving it.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user in the database.
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate a JWT token for the new user.
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Send the token back to the client.
    res.status(201).json({ token });
  } catch (error) {
    // Log and return any errors.
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
