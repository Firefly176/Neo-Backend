/**
 * @file index.js
 * @description This file contains routes for all Web3-related functionalities.
 */

import express from 'express';
import { getBalance } from '../../controllers/web3/getBalance.js';
import { createTransaction } from '../../controllers/web3/createTransaction.js';
import { getTransaction } from '../../controllers/web3/getTransaction.js';
import authenticate from '../../middlewares/tokenAuthCheck.js';
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
router.get('/getBalance', getBalance);

/**
 * @swagger
 * /api/v1/web3/transaction:
 *   get:
 *     summary: Get transactions from one wallet.
 *     description: Gets all the transaction for one wallet.
 *     parameters:
 *       - in: body
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Web3
 *     responses:
 *       200:
 *         description: Json response.
 *       401:
 *         description: Failed to create transaction.
 */
router.get('/transaction', authenticate, getTransaction);

/**
 * @swagger
 * /api/v1/web3/transaction:
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
router.post('/transaction', authenticate, createTransaction);

export default router;
