import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';

export const getTransaction = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.userId,
      },
      select: {
        id: true,
        recipientAddress: true,
        message: true,
        amount: true,
        scheduledDate: true,
        status: true,
      },
    });
    return res.status(201).json(transactions);
  } catch (error) {
    logger.error('Transaction error:', error);
    return res.status(500).json({ error: 'Failed to create transaction' });
  }
};
