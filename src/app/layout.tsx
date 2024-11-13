import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cabinetGrotesk = localFont({
  src: "../assets/fonts/CabinetGrotesk_Complete/Variable/CabinetGrotesk-Variable.ttf",
  variable: "--font-cabinet",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "ATS App",
  description: "Applicant Tracking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="cmyk" lang="en">
      <body
        className={`${cabinetGrotesk.variable} ${plusJakartaSans.variable}`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <Toaster />
            <div className="min-h-screen bg-base-100">{children}</div>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
