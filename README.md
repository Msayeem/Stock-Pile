# 📦 StockPile

A full-stack product & order management app — browse products, place orders, and manage your own listings, all with real authentication.

**🔗 Live App:** [stock-pile-neon.vercel.app](https://stock-pile-neon.vercel.app/)
**⚙️ Backend Repo:** [StockPile-backend](https://github.com/Msayeem/StockPile-backend)

---

## 🧭 Overview

StockPile is a simple, no-frills product and order management platform. Users can sign up, browse all available products, place orders on items they want, and manage the products they've personally listed — edit, update, or remove them anytime.

Built as a full-stack project to explore modern authentication (Better Auth), Prisma 7's driver-adapter workflow, and a clean, consistent UI across every page.

---

## ✨ Features

- 🔐 **Real Authentication** — Sign up and log in securely with [Better Auth](https://www.better-auth.com/)
- 🛍️ **Browse Products** — View all products listed by every user, with live search
- 🧾 **Place Orders** — Order any product in a click; view all your orders in one place
- 🗂️ **Manage Your Products** — Add, edit, and delete only the products *you* created
- 🖼️ **Product Images** — Every listing includes an image for a proper storefront feel
- 📱 **Fully Responsive** — Clean experience across desktop and mobile
- ⚡ **Polished UI/UX** — Loading skeletons, empty states, and toast notifications throughout

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- [JavaScript](https://www.javascriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroUI](https://www.heroui.com/) — component library
- [Better Auth](https://www.better-auth.com/) — authentication
- [Prisma ORM](https://www.prisma.io/) — auth data layer

**Backend** *(separate repo)*
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))

**Deployment**
- Frontend → [Vercel](https://vercel.com/)
- Backend → [Render](https://render.com/)
- Database → [Neon](https://neon.tech/) (PostgreSQL)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A PostgreSQL database (local or hosted, e.g. [Neon](https://neon.tech/))
- The [StockPile backend](https://github.com/Msayeem/StockPile-backend) running (locally or deployed)

### 1. Clone the repository

```bash
git clone https://github.com/Msayeem/StockPile-frontend.git
cd StockPile-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=auth"
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"
BETTER_AUTH_SECRET="your-generated-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

> 💡 Generate a secret with `openssl rand -base64 32`

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📂 Related Repositories

| Repo | Description |
|---|---|
| **StockPile (this repo)** | Next.js frontend with Better Auth |
| [StockPile-backend](https://github.com/Msayeem/StockPile-backend) | Express + Prisma + PostgreSQL REST API |

---

## 📄 License

This project is open source and available for learning purposes.
