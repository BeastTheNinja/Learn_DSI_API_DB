import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';
import { randomPrice, randomYear } from '../src/utils/seedHelpers';

// Asynkron main-funktion som kører vores seed-data
const main = async () => {
  // Rydder data i korrekt rækkefølge (dependents først)
  await prisma.car.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.fuelType.deleteMany();
  await prisma.user.deleteMany();

  // Opret kategorier
  await prisma.category.createMany({
    data: [
      { name: 'Personbil' },
      { name: 'Varevogn' },
      { name: 'Lastbil' },
      { name: 'Autocamper' },
      { name: 'Andre' }
    ],
    skipDuplicates: true
  });

  // Opret brands
  await prisma.brand.createMany({
    data: [
      { name: 'Toyota', logo: '' },
      { name: 'Ford', logo: '' },
      { name: 'BMW', logo: '' },
      { name: 'Volkswagen', logo: '' },
      { name: 'Tesla', logo: '' }
    ],
    skipDuplicates: true
  });

  // Opret drivmidler (fuel types) - Prisma modellen hedder `fuelType` og feltet er `type`
  await prisma.fuelType.createMany({
    data: [
      { type: 'Benzin' },
      { type: 'Diesel' },
      { type: 'El' },
      { type: 'Hybrid' },
      { type: 'Andre' }
    ],
    skipDuplicates: true
  });

  // Hent oprettede rækker så vi kan bruge deres ids
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const fueltypes = await prisma.fuelType.findMany();

  // Opret to brugere: en admin og en almindelig user
  const admin = await prisma.user.create({
    data: {
      firstname: 'Admin',
      lastname: 'Bruger',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpass', 10),
      role: 'ADMIN',
      isActive: true
    }
  });

  const normalUser = await prisma.user.create({
    data: {
      firstname: 'Normal',
      lastname: 'Bruger',
      email: 'user@example.com',
      password: await bcrypt.hash('userpass', 10),
      role: 'USER',
      isActive: true
    }
  });

  console.log('Seed completed for users:', { admin: admin.email, user: normalUser.email });

  // Helper to find id by name/type
  const findCategoryId = (name: string) => categories.find((c) => c.name === name)?.id as number;
  const findBrandId = (name: string) => brands.find((b) => b.name === name)?.id as number;
  const findFuelId = (type: string) => fueltypes.find((f) => f.type === type)?.id as number;

  // Opret mindst 10 biler med varierede relationer (år og pris genereres tilfældigt)
  const carData = [
    { model: 'Corolla', brand: 'Toyota', category: 'Personbil', fuel: 'Benzin' },
    { model: 'Rav4', brand: 'Toyota', category: 'Personbil', fuel: 'Hybrid' },
    { model: 'Model 3', brand: 'Tesla', category: 'Personbil', fuel: 'El' },
    { model: 'F-150', brand: 'Ford', category: 'Varevogn', fuel: 'Diesel' },
    { model: 'i3', brand: 'BMW', category: 'Personbil', fuel: 'El' },
    { model: 'Transporter', brand: 'Volkswagen', category: 'Varevogn', fuel: 'Diesel' },
    { model: 'Camper X', brand: 'Volkswagen', category: 'Autocamper', fuel: 'Diesel' },
    { model: 'Series 5', brand: 'BMW', category: 'Personbil', fuel: 'Benzin' },
    { model: 'Van Pro', brand: 'Ford', category: 'Lastbil', fuel: 'Diesel' },
    { model: 'Econo', brand: 'Toyota', category: 'Andre', fuel: 'Benzin' }
  ];

  for (const c of carData) {
    const year = randomYear(2008, 2024);
    const price = randomPrice(3000, 45000);

    const created = await prisma.car.create({
      data: {
        model: c.model,
        year,
        price,
        brandId: findBrandId(c.brand),
        categoryId: findCategoryId(c.category),
        fuelTypeId: findFuelId(c.fuel)
      }
    });
    console.log('Created car:', created.model, 'id', created.id, 'year', year, 'price', price);
  }

  console.log('Seeding complete.');
  
}

// Kør main-funktionen
main()
  .then(() => prisma.$disconnect()) // Lukker db forbindelsen når alt er ok
  .catch((e) => {
    console.error(e); 
    prisma.$disconnect();
    process.exit(1);
  });