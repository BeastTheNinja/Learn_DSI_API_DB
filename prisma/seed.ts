import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';

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
      { name: 'Benzin' },
      { name: 'Diesel' },
      { name: 'El' },
      { name: 'Hybrid' },
      { name: 'Andre' }
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
  const findFuelId = (name: string) => fueltypes.find((f) => f.name === name)?.id as number;

  // Opret mindst 10 biler med varierede relationer
  const carData = [
    { model: 'Corolla', year: 2019, price: '15999.00', brand: 'Toyota', category: 'Personbil', fuel: 'Benzin' },
    { model: 'Rav4', year: 2021, price: '24999.00', brand: 'Toyota', category: 'Personbil', fuel: 'Hybrid' },
    { model: 'Model 3', year: 2022, price: '37999.00', brand: 'Tesla', category: 'Personbil', fuel: 'El' },
    { model: 'F-150', year: 2018, price: '29999.00', brand: 'Ford', category: 'Varevogn', fuel: 'Diesel' },
    { model: 'i3', year: 2017, price: '10999.00', brand: 'BMW', category: 'Personbil', fuel: 'El' },
    { model: 'Transporter', year: 2020, price: '21999.00', brand: 'Volkswagen', category: 'Varevogn', fuel: 'Diesel' },
    { model: 'Camper X', year: 2015, price: '34999.00', brand: 'Volkswagen', category: 'Autocamper', fuel: 'Diesel' },
    { model: 'Series 5', year: 2016, price: '17999.00', brand: 'BMW', category: 'Personbil', fuel: 'Benzin' },
    { model: 'Van Pro', year: 2014, price: '8999.00', brand: 'Ford', category: 'Lastbil', fuel: 'Diesel' },
    { model: 'Econo', year: 2013, price: '4999.00', brand: 'Toyota', category: 'Andre', fuel: 'Benzin' }
  ];

  for (const c of carData) {
    const created = await prisma.car.create({
      data: {
        model: c.model,
        year: c.year,
        price: c.price,
        brandId: findBrandId(c.brand),
        categoryId: findCategoryId(c.category),
        fuelTypeId: findFuelId(c.fuel)
      }
    });
    console.log('Created car:', created.model, 'id', created.id);
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