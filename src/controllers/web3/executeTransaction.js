import { ethers } from 'ethers';
import web3Service from '../../services/web3Service.js';
import logger from '../../utils/logger.js';

export const executeTransaction = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    const receipt = await web3Service.executeTransaction(id);

    res.json({
        data: JSON.stringify(receipt)
    });
  } catch (error) {
    logger.error('Error executing transaction:', error);
    res.status(500).json({ error: 'Failed to execute transaction' });
  }
};
