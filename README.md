```markdown
# Learn_DSI_API_DB

Dette repository indeholder en lille API/DB-øvelse skrevet i TypeScript. README'en er opdateret med projektets dependencies og vigtige bemærkninger om Prisma-versioner.

Vigtige dependencies

Projektet er lavet med TypeScript og bruger Prisma. Sørg for at bruge følgende versioner (ellers kommenter beskrivelsen om datasource i schema.prisma som vist nedenfor):

```json
"dependencies": {
  "@prisma/client": "6.19",
  "dotenv": "^17.2.3",
  "express": "^5.1.0"
},
"devDependencies": {
  "@types/express": "^5.0.5",
  "@types/node": "^24.10.1",
  "prisma": "6.19",
  "tsx": "^4.20.6",
  "typescript": "^5.9.3"
}
```

Bemærk om Prisma 6.x vs 7.x

- Anbefalet: brug "prisma" og "@prisma/client" version 6.19 (præcist). Hvis I bruger disse versioner, fungerer schema.prisma typisk med en datasource som:

```prisma
datasource db {
  provider = "mysql"
  url = env("DATABASE_URL")
}
```

- Hvis I opgraderer til Prisma v7 (fx "prisma": "7.x"), kræver ændringer i schema'en nogle gange, og i nogle setups kan I være nødt til at fjerne eller kommentere url-linjen i datasource-delen. Eksempel (kommenteret url):

```prisma
datasource db {
  provider = "mysql"
  // url = env("DATABASE_URL")
}
```

Hvis I vælger at bruge Prisma v7 og lader url-linjen være der, kan det give fejl i visse konfigurationer, så enten brug 6.19 eller kommenter/fjern url-linjen i schema.prisma.

Installations- og udviklingsvejledning

1. Installer dependencies:

```bash
npm install
```

2. Generer Prisma-clienten (kør igen efter hver ændring i schema.prisma):

```bash
npx prisma generate
```

3. Kør migration (hvis nødvendigt):

```bash
npx prisma migrate dev --name init
```

4. Kør dev-serveren (eksempel med tsx):

```bash
npx tsx src/index.ts
# eller hvis der er en npm-script:
# npm run dev
```

Miljøvariabler

Sørg for at have en .env-fil med DATABASE_URL sat, fx:

```
DATABASE_URL="mysql://user:password@localhost:3306/databasename"
```

Hvis du bruger Prisma v7 og har kommenteret url-linjen i schema.prisma, skal du sikre dig, at din konfiguration stadig kan få forbindelse til databasen via den metode I vælger (fx via runtime-konfiguration eller miljøvariabler i din kode).
```
