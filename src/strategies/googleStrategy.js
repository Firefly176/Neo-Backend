// /**
//  * @file googleStrategy.js
//  * @description This file defines the Google OAuth strategy for Passport.js.
//  * The strategy authenticates users using their Google account, creates a new user
//  * if one does not already exist in the database, and serializes the user for session handling.
//  */

// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URI,
// } from '../config/index.js';
// import prisma from '../db/index.js';

// /**
//  * Passport strategy for authenticating users via their Google account.
//  *
//  * @param {string} accessToken - The access token received from Google after successful authentication.
//  * @param {string} refreshToken - The refresh token provided by Google, used to refresh the access token.
//  * @param {Object} profile - The user's Google profile information, including email and display name.
//  * @param {Function} done - A callback function that completes the authentication process.
//  *                          It should be called with `done(null, user)` for success, or `done(error)` for failure.
//  *
//  * @description This strategy first checks if the user exists in the database using their email address.
//  * If the user does not exist, it creates a new user with the provided email, name, and an account type of 'GOOGLE'.
//  * The user object is then serialized into the session using Passport.js.
//  */
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_REDIRECT_URI,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const name = profile.displayName;

//         // Check if the user already exists in the database
//         let user = await prisma.user.findUnique({
//           where: { email },
//         });

//         if (!user) {
//           // If the user doesn't exist, create a new one
//           user = await prisma.user.create({
//             data: {
//               email,
//               name,
//               accountType: 'GOOGLE', // Mark the account type as 'GOOGLE'
//             },
//           });
//         }

//         // Complete the authentication process by passing the user object to `done`
//         return done(null, user);
//       } catch (error) {
//         // If an error occurs, pass the error to `done` to handle failure
//         return done(error, null);
//       }
//     },
//   ),
// );

// export default passport;
