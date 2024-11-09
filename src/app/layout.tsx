import type { Metadata } from "next";
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
        <Toaster />
        <div className="min-h-screen bg-base-100">
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
        </div>
      </body>
    </html>
  );
}
