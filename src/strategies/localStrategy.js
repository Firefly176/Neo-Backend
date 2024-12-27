/**
 * @file localStrategy.js
 * @description This file defines the local authentication strategy for Passport.js.
 * The strategy authenticates users via their email and password. If the credentials are valid,
 * the user is authenticated and serialized into the session. If not, the authentication fails with an error.
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from '../db/index.js';

/**
 * Passport strategy for authenticating users via email and password (local authentication).
 *
 * @param {string} email - The email address provided by the user for authentication.
 * @param {string} password - The password provided by the user for authentication.
 * @param {Function} done - A callback function that completes the authentication process.
 *                          It should be called with `done(null, user)` for success, or `done(error)` for failure.
 *
 * @description This strategy checks if the user exists in the database by their email address.
 * If the user exists, it compares the provided password with the stored hash using `bcrypt`.
 * If the password is correct, the user is authenticated. If not, the authentication fails with an "Invalid credentials" message.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // If the user doesn't exist, authentication fails
          return done(null, false, { message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          // If the password is invalid, authentication fails
          return done(null, false, { message: 'Invalid credentials' });
        }

        // If the credentials are valid, return the user object
        return done(null, user);
      } catch (error) {
        // If an error occurs, pass the error to `done` to handle failure
        return done(error);
      }
    },
  ),
);

export default passport;
