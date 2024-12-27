import express from 'express';
const router = express.Router();

// /**
//  * @swagger
//  * /auth/logout:
//  *   get:
//  *     summary: Logs out the current user
//  *     description: Destroys the session and logs out the user.
//  *     tags:
//  *       - Authentication
//  *     responses:
//  *       200:
//  *         description: Logout successful
//  *       401:
//  *         description: Unauthorized, user not authenticated
//  */
router.get('/test/:id', function (req, res) {
  const id = req.params.id;
  return res.status(200).json({ message: 'testing', id });
});

export default router;
