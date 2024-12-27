import { DefaultSession } from "next-auth"
import { Company } from "@prisma/client";

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