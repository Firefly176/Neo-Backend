import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';
import { scheduleTransaction } from '../../controllers/web3/scheduleTransaction.js';

export const createTransaction = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;
    const { recipientAddress, message, amount, scheduledDate } = req.body;

    // Validate required fields
    if (!recipientAddress || !message || !amount || !scheduledDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTransaction = await prisma.$transaction(async (prismaClient) => {
      // Create web3 call here, if anything goes wrong, throw an error
      // Call the scheduleTransaction function
      const scheduleResult = await scheduleTransaction({
        body: {
          senderAddress: user.walletAddress,
          recipientAddress,
          amount,
          scheduledTime: Math.floor(new Date(scheduledDate).getTime() / 1000)
        }
      }, {
        json: (data) => data,
        status: () => ({ json: () => {} })
      });      

      if (scheduleResult.error) {
        throw new Error(scheduleResult.error);
      }

      // After the web3 function is completed, create the transaction record
      const transaction = await prismaClient.transaction.create({
        data: {
          recipientAddress,
          message,
          amount: parseFloat(amount),
          scheduledDate,
          status: 'SCHEDULED',
          user: {
            connect: {
              walletAddress: user.walletAddress,
            },
          },
        },
      });

      return transaction;
    });

    return res.status(201).json({ status: true });
  } catch (error) {
    logger.error('Transaction error:', error);
    return res.status(500).json({ error: 'Failed to create transaction' });
  }
};
