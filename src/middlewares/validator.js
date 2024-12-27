/**
 * @file validator.js
 * @description This middleware validates the request body (`req.body`) against a Joi validation schema.
 * If the body is valid, the middleware allows the request to proceed; otherwise, it sends a 400 error response
 * with a message indicating which validation rule failed.
 */

/**
 * Middleware to validate the request body against a provided Joi validation schema.
 * If the body is valid, the request proceeds to the next middleware or route handler.
 * If the validation fails, it returns a 400 Bad Request response with an error message.
 *
 * @param {Object} schema - The Joi schema to validate the request body against.
 * @returns {Function} A middleware function that validates the request body.
 *                     If validation passes, it calls `next()`. If validation fails, it sends a 400 response with an error message.
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    // If validation fails, return a 400 error with the validation message
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
  };
};
