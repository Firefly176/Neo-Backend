/**
 * @file app.js
 * @description Initializes the Express application, configures session management, Passport.js, Swagger, and application routes.
 */

import express from 'express';
import session from 'express-session';
import passport from './config/passport.js';
import routes from './routes/index.js';
import { NODE_ENV, SESSION_SECRET } from './config/index.js';
import { initializeMiddleware } from './middlewares/appInitializingMiddlewares.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig.js';

const app = express();

app.set('trust proxy', 1);
/**
 * Configures and initializes the session middleware.
 * @see {@link https://www.npmjs.com/package/express-session|express-session}
 */
app.use(
  session({
    secret: SESSION_SECRET,
    // resave: false,
    // saveUninitialized: false,
    // proxy: true,
    cookie: {
      // secure: true,
      // sameSite: 'none',
    },
  }),
);

/**
 * Initializes Passport.js for authentication.
 * @see {@link https://www.passportjs.org/|Passport.js}
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Initializes other middlewares used across the application.
 * @function initializeMiddleware
 * @param {object} app - The Express app instance.
 */
initializeMiddleware(app);

/**
 * Sets up the Swagger documentation route.
 * This route provides access to the Swagger UI documentation.
 * @name /api-docs
 * @see {@link https://swagger.io/|Swagger}
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Sets up the main API route for the application.
 * All API endpoints are prefixed with /api/v1.
 * @name /api/v1
 * @see {@link ./routes/index.js}
 */
app.use('/api/v1', routes);

export default app;
