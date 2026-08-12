import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(
  { connectionString: process.env.DATABASE_URL },
  { schema: "auth" }
);

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/sync`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
              }),
            });
          } catch (err) {
            console.error("Failed to sync user to backend:", err);
          }
        },
      },
    },
  },
});