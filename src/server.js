/**
 * @file server.js
 * @description Entry point for starting the server.
 */

import app from './app.js';
import { PORT } from './config/index.js';
import logger from './utils/logger.js';

/**
 * Starts the Express server.
 * @callback serverCallback
 * @returns {void}
 */
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
