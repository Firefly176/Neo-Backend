/**
 * @file index.js
 * @description Configuration file that loads environment variables and exports them for use throughout the application.
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * The port number the application will run on.
 * @constant {number}
 */
export const PORT = process.env.PORT || 3000;

/**
 * Secret key used for signing JWT tokens.
 * @constant {string}
 */
export const JWT_SECRET = process.env.JWT_SECRET;

/**
 * The database connection URL.
 * @constant {string}
 */
export const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Google OAuth2 client ID.
 * @constant {string}
 */
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

/**
 * Google OAuth2 client secret.
 * @constant {string}
 */
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

/**
 * LinkedIn OAuth2 client ID.
 * @constant {string}
 */
export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;

/**
 * LinkedIn OAuth2 client secret.
 * @constant {string}
 */
export const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

/**
 * Secret key used for session management.
 * @constant {string}
 */
export const SESSION_SECRET = process.env.SESSION_SECRET;

/**
 * The environment in which the application is running (e.g., development, production).
 * @constant {string}
 */
export const NODE_ENV = process.env.NODE_ENV;

/**
 * The URL of the frontend application.
 * @constant {string}
 */
export const FRONTEND_URL = process.env.FRONTEND_URL;

/**
 * The URL to redirect to upon successful authentication.
 * @constant {string}
 */
export const FRONTEND_SUCCESS_URL = process.env.FRONTEND_SUCCESS_URL;

/**
 * The URL to redirect to upon failed authentication.
 * @constant {string}
 */
export const FRONTEND_FAILURE_URL = process.env.FRONTEND_FAILURE_URL;

/**
 * Google OAuth2 redirect URI.
 * @constant {string}
 */
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

/**
 * LinkedIn OAuth2 redirect URI.
 * @constant {string}
 */
export const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;

/**
 * RPC URL
 * @constant {string}
 */
export const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";

/**
 * Mock Token Contract Address
 * @constant {string}
 */
export const mockTokenAddress = process.env.MOCK_TOKEN_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

/**
 * Payment Scheduler Contract Address
 * @constant {string}
 */
export const paymentSchedulerAddress = process.env.PAYMENT_SCHEDULER_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";