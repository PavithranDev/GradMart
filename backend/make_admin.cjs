const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const res = await prisma.user.updateMany({ data: { role: 'ADMIN' } });
  console.log('Updated:', res);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
