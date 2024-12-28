/**
 * @file passport.js
 * @description Configures Passport.js for user authentication, including serialization and deserialization of user sessions.
 */

import passport from 'passport';
// import '../strategies/googleStrategy.js';
// import '../strategies/linkedinStrategy.js';
import '../strategies/localStrategy.js';
import prisma from '../db/index.js';

/**
 * Serializes the user instance to store the user ID in the session.
 * @function
 * @param {Object} user - The user object.
 * @param {Function} done - Callback to signal the completion of the serialization.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserializes the user from the session using the user ID.
 * Fetches the user details from the database.
 * @function
 * @param {string} id - The user ID stored in the session.
 * @param {Function} done - Callback to return the user object or an error.
 * @throws {Error} Will pass any errors to the done callback.
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
