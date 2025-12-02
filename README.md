# Learn_DSI_API_DB

This repository contains a simple API project using TypeScript, Express and Prisma. Below you'll find the dependencies used, installation and setup instructions, and a quick example to get you started.

## Dependencies (install required)

```json
"dependencies": {
  "@prisma/client": "6.19",
  "bcrypt": "^6.0.0",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2"
},
"devDependencies": {
  "@types/bcrypt": "^6.0.0",
  "@types/express": "^5.0.5",
  "@types/jsonwebtoken": "^9.0.10",
  "@types/node": "^24.10.1",
  "prisma": "6.19",
  "tsx": "^4.20.6",
  "typescript": "^5.9.3"
}
```

## Requirements

- Node.js (recommended >= 18)
- npm (or yarn / pnpm)
- A database supported by Prisma (PostgreSQL, MySQL, SQLite, etc.) — you will set the connection string in the .env file

## Setup guide

1. Clone the repo (if you haven't already)
   ```bash
   git clone https://github.com/BeastTheNinja/Learn_DSI_API_DB.git
   cd Learn_DSI_API_DB
   ```

2. Add the dependency blocks above to your package.json dependencies/devDependencies, or install them directly:

   Using npm:
   ```bash
   # runtime deps
   npm install @prisma/client@6.19 bcrypt@^6.0.0 dotenv@^17.2.3 express@^5.1.0 jsonwebtoken@^9.0.2

   # dev deps
   npm install -D @types/bcrypt@^6.0.0 @types/express@^5.0.5 @types/jsonwebtoken@^9.0.10 @types/node@^24.10.1 prisma@6.19 tsx@^4.20.6 typescript@^5.9.3
   ```

   Or with yarn/pnpm similarly.

3. Create a `.env` file in the repository root (example):

   ```
   # .env
   DATABASE_URL="postgresql://dbuser:dbpassword@localhost:5432/mydb?schema=public"
   JWT_SECRET="your_jwt_secret_here"
   PORT=3000
   ```

   - Replace the DATABASE_URL with your database connection string.
   - Set a secure JWT_SECRET for signing tokens.
   - Optionally set PORT (defaults often to 3000 in examples).

4. Prisma setup

   - If you don't yet have a `prisma/schema.prisma`, create one describing your datasource and models.
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - If you use migrations (recommended for SQL DBs):
     ```bash
     npx prisma migrate dev --name init
     ```
     If you prefer to push the current schema without migrations (e.g., for quick local work with SQLite):
     ```bash
     npx prisma db push
     ```

5. TypeScript setup

   - If you don't yet have a `tsconfig.json`, initialize one:
     ```bash
     npx tsc --init
     ```
   - Example npm scripts you can add to package.json:
     ```json
     "scripts": {
       "dev": "tsx src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "prisma:generate": "prisma generate",
       "prisma:migrate": "prisma migrate dev"
     }
     ```

6. Run the project (development)
   ```bash
   npm run dev
   ```
   This uses `tsx` to run TypeScript directly (hot reload/watch setups can be added).

## Example

This example assumes your server listens on the PORT from the .env (e.g., 3000) and exposes a simple health endpoint at `/` or `/health`. Adjust the path to match your actual routes.

1. Start the server:
   ```bash
   npm run dev
   ```

2. Test with curl:

   ```bash
   # Health check (example)
   curl -i http://localhost:3000/
   ```

   Example successful response:
   ```
   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8

   {"status":"ok","message":"server running"}
   ```

3. Example of sending JSON to a POST endpoint (e.g., register/login) — adapt endpoint & payload as needed:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"password123"}'
   ```

   Expected response (example):
   ```json
   {
     "id": 1,
     "email": "alice@example.com"
   }
   ```

4. Example verifying a JWT-protected endpoint (replace TOKEN with a real token):
   ```bash
   curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/protected
   ```

## Notes & tips

- Keep secrets out of version control. Use `.env` and add `.env` to `.gitignore`.
- If you change Prisma models, run `npx prisma generate` again and apply migrations as appropriate.
- Use `bcrypt` for hashing passwords and `jsonwebtoken` (JWT) for auth tokens. Store JWT_SECRET securely.
- If using TypeScript types for express middleware, ensure `@types/express` and `@types/node` are installed as devDependencies.

---
