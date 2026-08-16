const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Please provide ADMIN_EMAIL and ADMIN_PASSWORD environment variables.");
    process.exit(1);
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Admin with email ${email} already exists.`);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const admin = await prisma.admin.create({
    data: {
      email,
      name: "Super Admin",
      role: "SUPER_ADMIN",
      passwordHash,
    },
  });

  console.log(`Super admin created with email: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
