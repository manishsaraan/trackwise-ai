import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/ui/sidebar";
import Navigation from "./components/navigation";
import Footer from "./components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
