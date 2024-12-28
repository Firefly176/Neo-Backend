/**
 * @file controller/web3/getBalance.js
 * @description This controller handles retrieving the balance of a specified wallet address
 * from a locally running Hardhat node. It uses ethers.js to interact with the blockchain
 * and returns the balance in Ether.
 */

import { ethers } from 'ethers';
import logger from '../../utils/logger.js';

/**
 * Retrieves the balance of a specified wallet address.
 *
 * This function connects to a local Hardhat node, fetches the balance of the provided
 * wallet address, and returns it in Ether. If the address is not provided or if there's
 * an error during the process, an appropriate error response is sent.
 *
 * @async
 * @function getBalance
 * @param {object} req - The request object, containing the wallet address in query or body.
 * @param {object} res - The response object used to send back the balance or error messages.
 * @returns {object} A JSON response containing the address and its balance in Ether.
 * @throws {Error} Throws an error if there is an issue during the balance retrieval process.
 * @example
 * // Example of a successful response:
 * // res.json({ address: '0x...', balance: '1.5' });
 *
 * // Example of an error response (missing address):
 * // res.status(400).json({ error: 'Wallet address is required' });
 */
export const getBalance = async (req, res) => {
  try {
    // Connect to the local Hardhat node
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

    // Get the wallet address from the request query or body
    const address = req.query.address || req.body.address;

    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Get the balance
    const balance = await provider.getBalance(address);

    // Convert balance from wei to ether
    const balanceInEther = ethers.formatEther(balance);

    res.json({ address, balance: balanceInEther });
  } catch (error) {
    logger.error('Error getting balance:', error);
    res.status(500).json({ error: 'Failed to get balance' });
  }
};
