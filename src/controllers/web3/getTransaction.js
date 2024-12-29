import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';

export const getTransaction = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;

    const { start, end } = req.query;

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    const where = {
      userId: user.userId,
    };

    if (startDate && endDate) {
      where.scheduledDate = {
        gte: startDate,
        lte: endDate,
      };
    } else if (startDate) {
      where.scheduledDate = {
        gte: startDate,
      };
    } else if (endDate) {
      where.scheduledDate = {
        lte: endDate,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
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
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
