# User Data API System - Simple README Guide

This project automatically collects user data every 5 minutes from the Random User API, stores it in a PostgreSQL database, and provides a REST API to access the data.

---

## 📦 Tech Stack
- Next.js (TypeScript)
- PostgreSQL
- Prisma ORM
- Node Cron
- Axios

---

## 🚀 How to Run This Project

### 1. Clone and Install
```bash
git clone <repo-url>
cd user-data-api
npm install
```

### 2. Setup Environment
Create a `.env` file:
```env
DATABASE_URL="postgresql://postgres:Nikita@123@localhost:5432/restapi"
```

### 3. Setup Prisma and Database
```bash
npx prisma migrate dev --name init
```
To view data:
```bash
npx prisma studio
```

### 4. Run the App
```bash
npm run dev
```
Every 5 minutes, 5 new users will be added automatically to the database.

---

##  How It Works (Step by Step)

### ✅ Step 1: Define Database Models
File: `prisma/schema.prisma`
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  gender    String
  createdAt DateTime @default(now())
  location  Location?
}

model Location {
  id      String @id @default(uuid())
  userId  String @unique
  city    String
  country String
  user    User   @relation(fields: [userId], references: [id])
}
```

### ✅ Step 2: Fetch and Save Users Automatically
File: `lib/fetchUsers.ts`
```ts
// Fetch 5 random users and save them in DB
```
File: `lib/cron.ts`
```ts
// Schedule fetch every 5 minutes
```
File: `pages/_app.tsx`
```ts
// Run cron only on server side
```

### ✅ Step 3: API Endpoint - /api/users
File: `pages/api/users.ts`
```ts
// GET /api/users
// Supports:
// - Filtering: ?gender=male&city=London
// - Pagination: ?page=1&limit=5
// - Field selection: ?fields=name,email
```

---

## 🔍 How to Test API
Examples:
- `/api/users` (Get all users)
- `/api/users?gender=male` (Filter by gender)
- `/api/users?page=2&limit=5` (Pagination)
- `/api/users?fields=name,email` (Only return name + email)

---

## ✅ Git Commit Examples
```bash
git commit -m "Setup Prisma schema for User and Location"
git commit -m "Add cron job to fetch and store users every 5 minutes"
git commit -m "Create API route /api/users with filtering and pagination"
```

---

## ✅ Done!
Let me know if you want to show users on a frontend page or deploy this to Vercel!

