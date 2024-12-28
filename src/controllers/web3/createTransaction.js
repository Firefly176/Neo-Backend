import prisma from "../../db/index.js";
import logger from "../../utils/logger.js";

export const createTransaction = async (req, res) => {
  try {
    const { walletAddress, recipientAddress, message, amount, scheduledDate } =
      req.body;

    // Validate required fields
    if (
      !walletAddress ||
      !recipientAddress ||
      !message ||
      !amount ||
      !scheduledDate
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTransaction = await prisma.$transaction(async (prismaClient) => {
      // Create web3 call here, if anything goes wrong, throw an error

      // After the web3 function is completed, create the transaction record
      const transaction = await prismaClient.transaction.create({
        data: {
          recipientAddress,
          message,
          amount,
          scheduledDate,
          status: "SCHEDULED",
          user: {
            connect: {
              walletAddress,
            },
          },
        },
      });

      return transaction;
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    logger.error("Transaction error:", error);
    return res.status(500).json({ error: "Failed to create transaction" });
  }
};
