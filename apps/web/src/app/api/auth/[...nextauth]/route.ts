import { DefaultSession } from "next-auth"
import { GET, POST } from "@/lib/auth";
import { Company } from "@prisma/client";
// Define your Company type

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      company?: Company | null;
    } & DefaultSession["user"]
  }
}

// Only add the new property to User
declare module "next-auth" {
  interface User {
    company?: Company | null;
  }
}

// Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    company?: Company | null;
  }
}

export { GET, POST }