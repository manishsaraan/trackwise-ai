import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../../stack";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/components/ui/sidebar";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/ui/footer";

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
    <div className="grid grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <Sidebar className="h-screen sticky top-0" />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 mt-11">{children}</div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
