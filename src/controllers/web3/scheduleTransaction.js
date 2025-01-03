import { ethers } from 'ethers';
import web3Service from '../../services/web3Service.js';
import logger from '../../utils/logger.js';

export const scheduleTransaction = async (req, res) => {
    try {
      const { senderAddress, recipientAddress, amount, scheduledTime } = req.body;
      if (!senderAddress || !recipientAddress || !amount || !scheduledTime) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
        const receipt = await web3Service.scheduleTransaction(
            senderAddress, 
            recipientAddress, 
            ethers.parseEther(amount),
            scheduledTime // This should now be a Unix timestamp
        );
        
        res.json({
            data: JSON.stringify(receipt)
        });
    } catch (error) {
      logger.error('Error scheduling transaction:', error);
      res.status(500).json({ error: 'Failed to schedule transaction' });
    }
  };  
