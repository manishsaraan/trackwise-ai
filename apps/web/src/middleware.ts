import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    try {
        const session = await auth();

        // If no session or user, allow access to login and signup
        if (!session || !session.user) {
            if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
                return NextResponse.next(); 
            } 

            return NextResponse.redirect(new URL('/login', req.url));
        }

        // If the user is logged in but doesn't have a company, redirect to onboarding
        if (!session.user.company && req.nextUrl.pathname !== '/onboarding') {
            return NextResponse.redirect(new URL('/onboarding', req.url));
        }

        // If the user is logged in and has a company, redirect away from onboarding
        if (session.user.company && req.nextUrl.pathname === '/onboarding') {
            return NextResponse.redirect(new URL('/jobs', req.url));
        }

        // If the user is logged in and tries to access /login or /signup, redirect to /jobs
        if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
            return NextResponse.redirect(new URL('/jobs', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error);  
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
  matcher: ["/jobs/:path*", "/profile/:path*", "/onboarding/:path*", '/login', '/signup'],
};
