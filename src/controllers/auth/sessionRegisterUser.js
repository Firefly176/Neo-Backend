/**
 * @file controller/auth/sessionRegisterUser.js
 * @description This controller handles user registration by creating a new user in the database
 * using the provided email, name, and password. If the email is already registered, it returns an error.
 * After successfully registering the user, it creates a session for the user.
 *
 * @module sessionRegisterUser
 */

import bcrypt from 'bcryptjs';
import prisma from '../../db/index.js';

/**
 * Registers a new user by hashing their password and saving the user's details in the database.
 * If the user is successfully created, a session is created for the user. If an error occurs,
 * it will pass to the next middleware.
 *
 * @async
 * @function sessionRegisterUser
 * @param {object} req - The request object containing the user details (name, email, password) to register.
 * @param {object} res - The response object used to send success or error messages.
 * @param {function} next - The next middleware function to pass errors to.
 * @returns {object} A JSON response with a success message or an error message.
 * @throws {Error} Passes any errors to the next middleware in the registration process.
 *
 * @example
 * // Example of a successful registration response:
 * // res.status(201).json({ message: 'Registration successful' });
 *
 * // Example of an error response (if email is already registered):
 * // res.status(400).json({ error: 'Email already registered' });
 */
export const sessionRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({ message: 'Registration successful' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
