
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'adminpassword';
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: {
      password: hashedPassword,
    },
    create: {
      username,
      password: hashedPassword,
    },
  });

  await prisma.task.upsert({
    where: { issueNumber: 'ISSUE-001' },
    update: {},
    create: {
      title: 'İlk Görev',
      issueNumber: 'ISSUE-001',
      status: 'To Do',
      user: { connect: { username } },
    },
  });

  console.log('Seed işlemi tamamlandı.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
