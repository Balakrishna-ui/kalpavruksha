import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting data cleanup...');

  // Delete transactions / user-submitted data
  const deletedMembers = await prisma.member.deleteMany();
  console.log(`Deleted ${deletedMembers.count} members.`);

  const deletedLeads = await prisma.lead.deleteMany();
  console.log(`Deleted ${deletedLeads.count} leads.`);

  const deletedFinancialEnquiries = await prisma.financialSchemeEnquiry.deleteMany();
  console.log(`Deleted ${deletedFinancialEnquiries.count} financial scheme enquiries.`);

  const deletedServiceRequests = await prisma.serviceRequest.deleteMany();
  console.log(`Deleted ${deletedServiceRequests.count} service requests.`);

  const deletedContactRequests = await prisma.contactRequest.deleteMany();
  console.log(`Deleted ${deletedContactRequests.count} contact requests.`);

  const deletedOrders = await prisma.order.deleteMany();
  console.log(`Deleted ${deletedOrders.count} orders.`);

  console.log('Data cleanup completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
