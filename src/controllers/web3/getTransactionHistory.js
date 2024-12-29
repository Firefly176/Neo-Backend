import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';

export const getTransactionHistory = async (req, res) => {
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
      orderBy: {
        scheduledDate: 'desc',
      },
      take: 10,
    });

    return res.status(200).json(transactions);
  } catch (error) {
    logger.error('Transaction error:', error);
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
