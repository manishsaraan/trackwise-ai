import NextAuth, { DefaultSession } from "next-auth"
import { GET, POST } from "@/lib/auth";

 

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name?: string | null
  }
}

// Extend the JWT type

 
export { GET, POST }