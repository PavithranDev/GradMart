const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function run() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@gradmart.com' },
    update: { role: 'ADMIN', password: hashedPassword },
    create: {
      email: 'admin@gradmart.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log('Admin user created/updated:', user.email);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
