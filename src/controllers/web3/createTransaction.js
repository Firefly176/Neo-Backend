import prisma from '../../db/index.js';
import logger from '../../utils/logger.js';
// import { scheduleTransaction } from '../../controllers/web3/scheduleTransaction.js';
import web3Service from '../../services/web3Service.js';

export const createTransaction = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;
    const { recipientAddress, message, amount, scheduledDate, result } =
      req.body;

    // Validate required fields
    if (!result) {
      return res.status(400).json({ error: 'Transaction Failed!' });
    }

    const parsedResult = JSON.parse(result);

    // await prisma.$transaction(async (prismaClient) => {
    // Create web3 call here, if anything goes wrong, throw an error
    // Call the scheduleTransaction function
    // const scheduleResult = await web3Service.scheduleTransaction(
    //     user.walletAddress,
    //     recipientAddress,
    //     amount,
    //     Math.floor(new Date(scheduledDate).getTime() / 1000)
    //   );

    // if (scheduleResult.error) {
    //   throw new Error(scheduleResult.error);
    // }

    // After the web3 function is completed, create the transaction record
    await prisma.transaction.create({
      data: {
        recipientAddress,
        message,
        amount: parseFloat(amount),
        scheduledDate,
        status: 'SCHEDULED',
        blockChainTxId:
          parsedResult.events.TransactionScheduled.returnValues.id,
        blockChainTxDump: parsedResult,
        user: {
          connect: {
            walletAddress: user.walletAddress,
          },
        },
      },
    });

    // });

    return res.status(201).json({ status: true });
  } catch (error) {
    logger.error('Transaction error:', error);
    return res.status(500).json({ error: 'Failed to create transaction' });
  }
};
