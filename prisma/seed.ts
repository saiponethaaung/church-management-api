import { PrismaClient } from '@prisma/client';

import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const countriesPath = path.join(__dirname, 'countries.json');
  const countriesData = fs.readFileSync(countriesPath, 'utf8');
  const countries = JSON.parse(countriesData);

  console.log(`Start seeding ${countries.length} countries...`);

  for (const country of countries) {
    const createdCountry = await prisma.country.upsert({
      where: { code: country.code },
      update: country,
      create: country,
    });
    console.log(`Upserted country: ${createdCountry.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
