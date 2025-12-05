import path from 'path';
import bcrypt from 'bcrypt';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { fieldTypes } from './types';
import { prisma } from '../src/prisma';
import { randomYear, randomPrice } from '../src/utils/seedHelpers';

const models = Object.keys(fieldTypes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'csv');

async function main() {
  // Clear dependent tables first (to avoid FK constraint violations)
  await prisma.car.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.fuelType.deleteMany();
  await prisma.user.deleteMany();

  const csvFiles = (await readdir(dir)).filter(f => f.endsWith('.csv'));

for (const model of models) {
  const file = `${model}.csv`;
  if (!csvFiles.includes(file)) continue;
  const raw = parse(await readFile(path.join(dir, file), 'utf-8'), {
  columns: true,
  skip_empty_lines: true
});

const data = await Promise.all(raw.map((row: any) => cast(model, row)));
await (prisma as any)[model].createMany({ data, skipDuplicates: true });
console.log(`Seeded ${model}: ${data.length} records`);
}
}

async function cast(model: string, row: any) {
  const types = fieldTypes[model];
  const out: any = {};

  for (const key in row) {
    const val = row[key]?.toString().trim();
    const type = types[key];

    if (key === 'password') out[key] = await bcrypt.hash(val, 10);
    // Use random helpers for car year and price
    else if (model === 'car' && key === 'year') out[key] = randomYear(2008, 2024);
    else if (model === 'car' && key === 'price') out[key] = randomPrice(3000, 45000);
    else if (type === 'number') out[key] = Number(val);
    else if (type === 'boolean') out[key] = val !== '0';
    else if (type === 'date') out[key] = val ? new Date(val) : null;
    else out[key] = val ?? null;
  }
  return out;
}

main()
.then(() => console.log('seed done'))
.finally(() => prisma.$disconnect());