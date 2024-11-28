import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            // Redirect to login if session is not found or user is undefined
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if(!session.user.company && req.nextUrl.pathname !== '/onboarding') {
            return NextResponse.redirect(new URL('/onboarding', req.url));
        }

        if(session.user.company && req.nextUrl.pathname === '/onboarding'){
            return NextResponse.redirect(new URL('/jobs', req.url))
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error); // Log the error for better debugging
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
  matcher: ["/jobs/:path*", "/profile/:path*", "/application-success/:path*", "/onboarding/:path*"],
}

