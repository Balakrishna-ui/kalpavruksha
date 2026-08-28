import { PrismaClient } from '@prisma/client';

// Single Prisma Client instance to prevent connection limits
const prisma = new PrismaClient();

export default prisma;
