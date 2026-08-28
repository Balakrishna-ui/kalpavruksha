const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TARGET_MODELS = [
  'Member',
  'Lead',
  'ServiceRequest',
  'FinancialSchemeEnquiry',
  'ContactRequest',
  'Order'
];

const TEST_NAMES = [
  'E2E USER',
  'TEST USER',
  'JOHN DOE',
  'TEST INQUIRY',
  'TEST'
];

const TEST_EMAILS = [
  'e2e@test.com',
  'test@example.com',
  'test@test.com',
  'john@example.com'
];

const TEST_PHONES = [
  '9876543210',
  '9999999999',
  '1234567890'
];

function isTestRecord(record) {
  const name = (record.name || record.fullName || record.customerName || '').toUpperCase();
  const email = (record.email || '').toLowerCase();
  const phone = (record.phone || record.mobile || record.mobileNumber || record.phoneNumber || '');
  const message = (record.message || record.notes || record.subject || '').toUpperCase();

  let reason = [];

  if (TEST_NAMES.some(n => name === n.toUpperCase())) {
    reason.push(`Matched exact test name: ${name}`);
  } else if (name.includes('E2E USER') || name.includes('TEST USER')) {
    reason.push(`Name contains test identifier: ${name}`);
  }

  if (TEST_EMAILS.includes(email)) {
    reason.push(`Matched test email: ${email}`);
  }

  if (TEST_PHONES.includes(phone)) {
    reason.push(`Matched test phone: ${phone}`);
  }

  if (message.includes('E2E TEST MESSAGE') || message.includes('E2E SUBJECT') || message.includes('TEST INQUIRY')) {
    reason.push(`Message/subject contains test string`);
  }

  return reason.length > 0 ? reason.join(' | ') : null;
}

async function run() {
  const report = [];

  for (const model of TARGET_MODELS) {
    if (!prisma[model]) continue;
    const records = await prisma[model].findMany();
    
    for (const record of records) {
      const reason = isTestRecord(record);
      if (reason) {
        report.push({
          model,
          id: record.id,
          name: record.name || record.fullName || record.customerName || 'N/A',
          email: record.email || 'N/A',
          phone: record.phone || record.mobile || record.mobileNumber || record.phoneNumber || 'N/A',
          createdAt: record.createdAt,
          reason
        });
      }
    }
  }

  console.log(JSON.stringify(report, null, 2));
  await prisma.$disconnect();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
