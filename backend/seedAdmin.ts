import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'kalpavruksha.palamuru@gmail.com';
  const password = 'kalpavruksha@123';

  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('Admin user already exists. Skipping seed.');
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create admin
  await prisma.adminUser.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  console.log('Successfully seeded default admin user.');
}

main()
  .catch((e) => {
    console.error('Error seeding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
