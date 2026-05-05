import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../lib/auth/password';

const prisma = new PrismaClient();

async function main() {
  const agency = await prisma.agency.upsert({
    where: { id: 'seed-agency' },
    update: {},
    create: { id: 'seed-agency', name: 'Addis Global Employment Agency' }
  });

  await prisma.user.upsert({
    where: { email: 'admin@ethioagencyhub.com' },
    update: {},
    create: {
      agencyId: agency.id,
      email: 'admin@ethioagencyhub.com',
      passwordHash: await hashPassword('ChangeMe123!'),
      role: Role.AGENCY_ADMIN
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
