import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing demo data...');
  
  await Promise.all([
    prisma.lead.deleteMany(),
    prisma.serviceRequest.deleteMany(),
    prisma.financialSchemeEnquiry.deleteMany(),
    prisma.member.deleteMany(),
    prisma.order.deleteMany()
  ]);

  console.log('All demo data cleared successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
