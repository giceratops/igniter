/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.navItem.deleteMany();

  // Ignition
  await prisma.navItem.create({
    data: {
      name: 'Ignition',
      link: '/ignition',
      children: { create: [
        { name: 'Containers', link: 'ignition/containers' },
        { name: 'Volumes', link: 'ignition/volumes'},
        { name: 'Images', link: 'ignition/images'},
      ] }
    }
  });

  // PLC Generator
  await prisma.navItem.create({
    data: {
      name: 'PLC Generator',
      link: '/plc',
      children: { create: [
        { name: 'Siemens', link: 'plc/siemens' },
        { name: 'Beckhoff', link: 'plc/beckhoff'},
      ] }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
