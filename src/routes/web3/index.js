/**
 * @file index.js
 * @description This file contains routes for all Web3-related functionalities.
 */

import express from "express";
import { getBalance } from "../../controllers/web3/getBalance.js";
import { instantTransaction } from "../../controllers/web3/instantTransaction.js";
import { createTransaction } from "../../controllers/web3/createTransaction.js";
const router = express.Router();

/**
 * @swagger
 * /api/v1/web3/getBalance:
 *   get:
 *     summary: Gets the wallet balance of the required address.
 *     description: Gets the wallet balance of the required address.
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Web3
 *     responses:
 *       200:
 *         description: Wallet Balance successfully retreived.
 *       401:
 *         description: Failed to retreive the Wallet Balance.
 */
router.get("/getBalance", getBalance);

/**
 * @swagger
 * /api/v1/web3/instantTransaction:
 *   post:
 *     summary: Creates an instant transaction from one wallet to another.
 *     description: Creates an instant transaction from one wallet to another.
 *     parameters:
 *       - in: body
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Web3
 *     responses:
 *       201:
 *         description: Transaction successfully created.
 *       401:
 *         description: Failed to create transaction.
 */
router.post('/instantTransaction', instantTransaction);

/**
 * @swagger
 * /api/v1/web3/createTransaction:
 *   post:
 *     summary: Creates a transaction from one wallet to another.
 *     description: Creates a transaction from one wallet to another.
 *     parameters:
 *       - in: body
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Web3
 *     responses:
 *       201:
 *         description: Transaction successfully created.
 *       401:
 *         description: Failed to create transaction.
 */
router.post("/createTransaction", createTransaction);

router.get("/test/:id", function (req, res) {
  const id = req.params.id;
  return res.status(200).json({ message: "testing", id });
});

router.post("/test/:id", function (req, res) {
  const { body } = req;
  console.log(body.walletAddress);
  const id = req.params.id;
  return res.status(200).json({ message: "testing", id, body });
});

export default router;
