import { PrismaClient } from '@prisma/client';

console.log('prisma');
const prisma = new PrismaClient({
  log:
       ['query', 'error', 'warn'] 
});
console.log({prisma});


console.log('prisma');


export {}