import { ethers } from 'ethers';
import { rpcUrl, mockTokenAddress, paymentSchedulerAddress } from '../config/index.js';
// import PaymentSchedulerJSON from '../../../payment-scheduler/artifacts/contracts/PaymentScheduler.sol/PaymentScheduler.json' with { type: "json" };
import PaymentSchedulerJSON from '../contract/PaymentScheduler.json' with { type: "json" };
const PaymentSchedulerABI = PaymentSchedulerJSON.abi;

class Web3Service {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        
        if (!paymentSchedulerAddress) {
          throw new Error('Contract address is not set in the configuration');
        }
        
        this.contract = new ethers.Contract(paymentSchedulerAddress, PaymentSchedulerJSON.abi, this.provider);
      }

    async getBalance(address) {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    async instantTransaction(senderAddress, recipientAddress, amount) {
        const signer = await this.provider.getSigner(senderAddress);
        const contractWithSigner = this.contract.connect(signer);
        const fee = await contractWithSigner.calculateDynamicFee(amount);
        const tx = await contractWithSigner.instantTransaction(recipientAddress, amount, { value: amount + fee });
        const receipt = await tx.wait();
        console.log(receipt);
        return receipt;
    }

    async scheduleTransaction(senderAddress, recipientAddress, amount, scheduledTime) {
      const signer = await this.provider.getSigner(senderAddress);
      const contractWithSigner = this.contract.connect(signer);
      const fee = await contractWithSigner.calculateDynamicFee(amount);
      const tx = await contractWithSigner.scheduleTransaction(recipientAddress, amount, scheduledTime, { value: amount + fee });
      const receipt = await tx.wait();
      console.log(receipt);
      return receipt;
    }
  
    async executeTransaction(id) {
      const signer = await this.provider.getSigner();
      const contractWithSigner = this.contract.connect(signer);
      const tx = await contractWithSigner.executeTransaction(id);
      const receipt = await tx.wait();
      console.log(receipt);
      return receipt;
    }

  // Add other contract interaction methods here
}

export default new Web3Service();
