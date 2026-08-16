# Sportsperson of the Year

A production web application built with Next.js (Pages Router), Prisma ORM, and NextAuth.

## Database Setup (Local Development)

By default, this project is configured to use **SQLite** for local development. This allows you to run the app immediately without setting up a database server.

1. Install dependencies: `npm install`
2. Push the schema to the local SQLite database: `npx prisma db push` (or `npx prisma migrate dev`)
3. Seed the admin account (set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your terminal):
   ```bash
   ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="securepassword" node scripts/createAdmin.js
   ```
4. Start the dev server: `npm run dev`

## Switching to PostgreSQL (Production)

When you are ready to go live, you should switch to a hosted PostgreSQL database (such as Supabase or Neon).

### 1. Update `prisma/schema.prisma`
Change the provider from `sqlite` to `postgresql`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Update `.env`
Change your `DATABASE_URL` to point to your new Postgres connection string. (If using Supabase, make sure to use the connection pooling URL if deploying to a serverless environment like Vercel).
```env
DATABASE_URL="postgres://user:password@host:port/database"
```

### 3. Generate the Migration
Because you switched database providers, you must create a new initial migration for Postgres.
*Important: If you have an existing `prisma/migrations` folder from SQLite, delete it first.*

```bash
npx prisma migrate dev --name init_postgres
```

### 4. Deploying Migrations
When deploying your app to production (e.g., Vercel, Netlify), you should run migrations as part of the build step. Add this to your `package.json` build script, or run it manually:
```bash
npx prisma migrate deploy
```
This safely applies pending migrations to your production database without resetting data.
