import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';

// Asynkron main-funktion som kører vores seed-data
const main = async () => {
 
  // Sletter eksisterende data i bruger tabellen
  await prisma.user.deleteMany() 

  // Opretter en testbruger i databasen
  const user = await prisma.user.create({
    data: {
      firstname: "Test", 
      lastname: "Bruger", 
      email: "test@example.com", // Login-email
      password: await bcrypt.hash('password', 10), // Password hash 
      role: "USER", // Bruger rolle
      isActive: true // Brugeren er aktiv og må logge ind
    }
    
  });
  
  // Udskriver i terminalen at brugeren er oprettet
  console.log("Seed completed for users:", user);
  
  // Opretter mange drivmidler i databasen
  const fueltypes = await prisma.fuelType.createMany({
    data: [
      { name: "Benzin" }, 
      { name: "Diesel" },
      { name: "Hybrid" }, 
      { name: "Electricity" }, 
      { name: "Coffee" } 
    ]
  });
  console.log("Seed completed for fueltypes:", fueltypes);
  
}

// Kør main-funktionen
main()
  .then(() => prisma.$disconnect()) // Lukker db forbindelsen når alt er ok
  .catch((e) => {
    console.error(e); 
    prisma.$disconnect();
    process.exit(1);
  });