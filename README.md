# Learn_DSI_API_DB

This repository contains a simple API project using TypeScript, Express and Prisma. Below you'll find the dependencies used, installation and setup instructions, and a quick example to get you started.

NOTE: This README was updated to reflect recent additions to the repository: a TypeScript `src/` implementation, a `prisma/` directory, and a `prisma.config.ts` configuration file. See "What's new" and "Project structure" below.

## What's new

- `src/` — The TypeScript source for the Express API (routes, controllers, middleware, etc.). Start here to see how the API is implemented and how Prisma client is used.
- `prisma/` — Prisma schema and any migrations / seeds (if present). This is where your `schema.prisma` lives and where migrations are managed.
- `prisma.config.ts` — A TypeScript configuration helper for Prisma tooling (present in the repo). It may contain custom Prisma client configuration or tooling settings used by the project.
- `package.json` / `package-lock.json` — The project contains a package manifest and lockfile; use the provided scripts for local development.

## Dependencies (install required)

```json
"dependencies": {
    "@prisma/client": "6.19",
    "bcrypt": "^6.0.0",
    "csv-parse": "^6.1.0",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/csv-parse": "^1.1.12",
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

## Project structure (high level)

- /.gitignore
- /LICENSE
- /README.md
- /package.json
- /package-lock.json
- /prisma.config.ts
- /prisma/          — Prisma schema, migrations, seeds
- /src/             — TypeScript source (Express app, routes, controllers, utils, etc.)
- /tsconfig.json

Open the `src/` folder to review the server entrypoint (often `src/index.ts` or `src/server.ts`), routes, middleware, and how the Prisma client is imported and used.

## Setup guide

1. Clone the repo (if you haven't already)
   ```bash
   git clone https://github.com/BeastTheNinja/Learn_DSI_API_DB.git
   cd Learn_DSI_API_DB
   ```

2. Install dependencies

   Using npm:
   ```bash
   npm install
   ```
   Or install the exact runtime / dev dependencies shown above if you prefer explicit installs.

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

   - Ensure `prisma/schema.prisma` exists in the `prisma/` directory (this repo contains a `prisma/` folder).
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - Apply migrations (if you want to use migrations):
     ```bash
     npx prisma migrate dev --name init
     ```
     Or, if you prefer to push the current schema without migrations (e.g., for quick local work with SQLite):
     ```bash
     npx prisma db push
     ```

   Note: this repo also includes `prisma.config.ts` — if your project or tooling expects it, keep that file in place. If you need to customize Prisma tooling behavior, inspect `prisma.config.ts` for details.

5. TypeScript setup

   - If you don't yet have a `tsconfig.json`, initialize one:
     ```bash
     npx tsc --init
     ```
   - Example npm scripts you may find in `package.json` (or add them):
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
   This uses `tsx` to run TypeScript directly. The `src/` folder contains the TypeScript entrypoint the `dev` script runs.

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
- Inspect `prisma.config.ts` and the `prisma/` directory to understand how the schema, migrations, or seeds are organized in this repo.
- Open the `src/` folder to see concrete examples of route handlers, auth middleware, and how the Prisma client is imported and instantiated.

---
