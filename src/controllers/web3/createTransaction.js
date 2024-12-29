import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';

export const createTransaction = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;
    const { receiverAddress, message, amount, scheduleDateTime } = req.body;

    // Validate required fields
    if (!receiverAddress || !message || !amount || !scheduleDateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTransaction = await prisma.$transaction(async (prismaClient) => {
      // Create web3 call here, if anything goes wrong, throw an error

      // After the web3 function is completed, create the transaction record
      const transaction = await prismaClient.transaction.create({
        data: {
          recipientAddress: receiverAddress,
          message,
          amount: parseFloat(amount),
          scheduledDate: scheduleDateTime,
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

    return res.status(201).json(newTransaction);
  } catch (error) {
    logger.error('Transaction error:', error);
    return res.status(500).json({ error: 'Failed to create transaction' });
  }
};
