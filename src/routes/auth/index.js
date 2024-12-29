/**
 * @file index.js
 * @description This file contains routes for user authentication including login, registration, and social login using Google and LinkedIn. It also handles user session management and provides user-related endpoints.
 */

import express from 'express';
import { validateBody } from '../../middlewares/validator.js';
import authenticate from '../../middlewares/tokenAuthCheck.js';
import { loginSchema, registerSchema } from '../../utils/schemas.js';
import { loginUser } from '../../controllers/auth/login.js';
import { registerUser } from '../../controllers/auth/register.js';
import passport from '../../config/passport.js';
import { passportLogout } from '../../controllers/auth/passportLogout.js';
import {
  FRONTEND_FAILURE_URL,
  FRONTEND_SUCCESS_URL,
} from '../../config/index.js';
import { getPassportUser } from '../../controllers/auth/getPassportUser.js';
import { sessionLoginUser } from '../../controllers/auth/sessionLogin.js';
import { sessionRegisterUser } from '../../controllers/auth/sessionRegisterUser.js';
import jwt from 'jsonwebtoken';
import prisma from '../../db/index.js';

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiates Google authentication
 *     description: Redirects users to the Google OAuth login page for authorization.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handles Google OAuth callback
 *     description: Redirects the user based on success or failure of Google login.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects based on success or failure of login
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    state: 'some',
    passReqToCallback: true,
    successRedirect: FRONTEND_SUCCESS_URL,
    failureRedirect: FRONTEND_FAILURE_URL,
  }),
);

/**
 * @swagger
 * /auth/linkedin:
 *   get:
 *     summary: Initiates LinkedIn authentication
 *     description: Redirects users to the LinkedIn OAuth login page for authorization.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to LinkedIn login page
 */
router.get('/linkedin', passport.authenticate('linkedin'));

/**
 * @swagger
 * /auth/linkedin/callback:
 *   get:
 *     summary: Handles LinkedIn OAuth callback
 *     description: Redirects the user based on success or failure of LinkedIn login.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects based on success or failure of login
 */
router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    state: 'some',
    passReqToCallback: true,
    successRedirect: FRONTEND_SUCCESS_URL,
    failureRedirect: FRONTEND_FAILURE_URL,
  }),
);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Retrieves the authenticated user
 *     description: Returns the currently authenticated user if available.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Authenticated user details
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.get('/user', getPassportUser);

/**
 * @swagger
 * /auth/token/login:
 *   post:
 *     summary: User login via JWT token
 *     description: Authenticates the user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Validation error or incorrect credentials
 */
router.post('/token/login', validateBody(loginSchema), loginUser);

/**
 * @swagger
 * /auth/token/register:
 *   post:
 *     summary: User registration via JWT token
 *     description: Registers a new user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registration successful, returns JWT token
 *       400:
 *         description: Validation error
 */
router.post('/token/register', validateBody(registerSchema), registerUser);

/**
 * @swagger
 * /auth/session/login:
 *   post:
 *     summary: User login via session-based authentication
 *     description: Logs in the user and creates a session.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error or incorrect credentials
 */
router.post('/session/login', validateBody(loginSchema), sessionLoginUser);

/**
 * @swagger
 * /auth/session/register:
 *   post:
 *     summary: User registration via session-based authentication
 *     description: Registers a new user and creates a session.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error
 */
router.post(
  '/session/register',
  validateBody(registerSchema),
  sessionRegisterUser,
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logs out the current user
 *     description: Destroys the session and logs out the user.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.get('/logout', passportLogout);

// Authentication route
router.post('/web3', passport.authenticate('web3'), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h', // Token expires in 24 hours.
  });
  res.json({ token });
});

// Protected route example
router.get('/profile', authenticate, async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ ...req.user });
});

export default router;
