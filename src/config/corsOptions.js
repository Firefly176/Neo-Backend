/**
 * @file corsOptions.js
 * @description Configuration for Cross-Origin Resource Sharing (CORS) to control the origins that can access the API.
 */

/**
 * List of origins allowed to access the API.
 * @constant {string[]}
 */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:5173',
  'https://neo-frontend-beryl.vercel.app/',
];

/**
 * CORS configuration object to control allowed origins and credentials settings.
 *
 * @type {Object}
 * @property {Function} origin - Function to check if the request's origin is allowed. Accepts the request origin and a callback function.
 * @property {boolean} credentials - Whether to allow credentials (cookies, authorization headers, etc.) to be included in cross-origin requests.
 */
export const corsOptions = {
  /**
   * Function to validate the origin of incoming requests. Allows requests from `allowedOrigins` or when the origin is undefined (e.g., server-to-server requests).
   *
   * @param {string} origin - The origin of the incoming request.
   * @param {Function} callback - Callback to indicate whether the request should be allowed or denied.
   */
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  /**
   * Enables inclusion of credentials (cookies, authorization headers, etc.) in cross-origin requests.
   */
  credentials: true,
};

export default corsOptions;
