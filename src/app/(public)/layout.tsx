import Link from "next/link";
import { Github } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
  showGithub?: boolean;
}

export default function PublicLayout({
  children,
  showGithub = true, // Default to true
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-base-100/50 to-base-100 ">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-sm z-40 pt-6">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            <h1 className="font-cabinet-grotesk text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              TrackWiseAI
            </h1>
          </Link>

          {/* GitHub Button - Only show if prop is true */}
          {showGithub && (
            <a
              href="https://github.com/yourusername/yourrepo"
              className="btn btn-outline gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          )}
        </div>
      </header>

      {/* Main Content - Add padding-top to account for fixed header */}
      <main className="pt-16">{children}</main>
    </div>
  );
}
