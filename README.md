# Neo-Backend: Decentralized Payment Scheduler API

Welcome to the Neo-Backend repository, the server-side component of our decentralized payment scheduling application. This backend provides the necessary API endpoints and database interactions to support the Neo-Frontend application.

## Features

- **User Management**: Create and manage user accounts with wallet addresses.
- **Transaction Handling**: Process instant and scheduled transactions.
- **Data Persistence**: Store user and transaction data securely.
- **Smart Contract Interaction**: Communicate with the PaymentScheduler smart contract.
- **API Endpoints**: Provide RESTful API endpoints for frontend integration.

## Technology Stack

- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain Interaction**: ethers.js for smart contract communication

## Smart Contract

- **Address**: [0xfed3a7bd6f85189355bee76e7c50d036a685dc0b](https://xt4scan.ngd.network/address/0xfed3a7bd6f85189355bee76e7c50d036a685dc0b)
- **Network**: Neo X Testnet (NeoX T4)
  - Chain ID: 12227332
  - RPC Endpoint: https://neoxt4seed1.ngd.network
  - WSS Endpoint: wss://neoxt4wss1.ngd.network
  - Block Explorer: https://xt4scan.ngd.network/
  - Currency Symbol: GAS

## Documentation

### Smart Contract Integration

The backend interacts with the `PaymentScheduler` smart contract using ethers.js. Key functions include:

- `instantTransaction`: For immediate payments
- `scheduleTransaction`: For creating future-dated transactions
- `executeTransaction`: For triggering scheduled payments
- `cancelTransaction`: For cancelling scheduled payments
- `calculateDynamicFee`: For determining transaction fees

### Error Handling

The backend implements robust error handling, including:

- Input validation
- Database operation error handling
- Smart contract interaction error handling
- Custom error responses for client-side handling

## Authors (A-Z)

- [Aniket Gupta](https://github.com/Firefly176)
- [Chirag Tamhane](https://github.com/Chirag175)

## Contributing

We welcome contributions to the Neo-Backend project. Please read our contributing guidelines before submitting pull requests.

## License

[GNU LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/)
