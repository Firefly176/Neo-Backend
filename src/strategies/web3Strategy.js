import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';
import prisma from '../db/index.js';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

passport.use(
  'web3',
  new CustomStrategy(async (req, done) => {
    try {
      const { signature, message, address } = req.body;

      // Verify the signature
      const recoveredAddress = web3.eth.accounts.recover(message, signature);

      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return done(null, false, { message: 'Invalid signature' });
      }

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { walletAddress: address },
      });

      if (!user) {
        user = await prisma.user.create({
          data: { walletAddress: address },
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

export default passport;
