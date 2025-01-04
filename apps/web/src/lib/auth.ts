import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcryptjs from "bcryptjs";
import { JWT } from "next-auth/jwt"
import { Session, User } from "next-auth"
import { Company } from "@prisma/client";

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>, 
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          const company = await prisma.company.findUnique({
            where: { userId: user.id },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            company: company || null,
          } as User;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger }: {
      token: JWT;
      user?: User | null;
      trigger?: string;
    }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email ?? '';
        token.company = user.company;
      }
      if (trigger === 'update') {
        const { id } = token;
        const company = await prisma.company.findUnique({
          where: { userId: id },
        });
        token.company = company as Company;
      }
      return token;
    },
    async session({ session, token }: {
      session: Session;
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.company = token.company;
      }
      return session;
    },
  }
};

export const {
  handlers: { GET, POST },
  auth, 
  signOut,
} = NextAuth(authOptions);