// /**
//  * @file db/index.js
//  * @description This file sets up and exports the PrismaClient instance for interacting with the database.
//  * It initializes a new instance of `PrismaClient` which is used throughout the application to interact
//  * with the database via Prisma ORM.
//  */

// import { PrismaClient } from '@prisma/client';

// // Create a new instance of PrismaClient
// const prisma = new PrismaClient();

// /**
//  * The Prisma Client instance.
//  * This instance allows interaction with the database, including CRUD operations
//  * on the defined models. It's the main database interface for this application.
//  *
//  * @type {PrismaClient}
//  * @example
//  * // Example usage:
//  * const users = await prisma.user.findMany(); // Fetch all users from the database
//  */
// export default prisma;


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Your database operations here
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

export default prisma;