import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma"; // Ensure prisma is imported correctly
import bcryptjs from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          // Fetch company info for the user
          const company = await prisma.company.findUnique({
            where: { userId: user.id },
          });

          // Return user object with company info (you can add more fields as needed)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            company: company || null, // Add company info to the returned user object
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: "/login", 
  },
  debug: true,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.company = user.company; 
      }

      if(trigger === 'update') { 
        const { id } = token;
        const company = await prisma.company.findUnique({
          where: { userId: id },
        });
             
        token.company = company; 
      }

      return token;
    },

    async session({ session, token }) {    
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.company = token.company; 
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
