/**
 * @file index.js
 * @description This file contains routes for all Web3-related functionalities.
 */

import express from 'express';
import { getBalance } from '../../controllers/web3/getBalance.js';
import { instantTransaction } from '../../controllers/web3/instantTransaction.js';
import { scheduleTransaction } from '../../controllers/web3/scheduleTransaction.js';
import { executeTransaction } from '../../controllers/web3/executeTransaction.js';
import { createTransaction } from '../../controllers/web3/createTransaction.js';
import { getTransaction } from '../../controllers/web3/getTransaction.js';
import { getTransactionHistory } from '../../controllers/web3/getTransactionHistory.js';
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
router.get('/transaction', getTransaction);

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
router.get('/transaction/history', getTransactionHistory);

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
router.post('/transaction', createTransaction);

router.post('/scheduleTransaction', scheduleTransaction);

router.post('/executeTransaction', executeTransaction);

export default router;
