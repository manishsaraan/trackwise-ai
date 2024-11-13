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
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-base-100/80 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            TrackWiseAI
          </Link>

          {/* GitHub Button - Only show if prop is true */}
          {showGithub && (
            <Link
              href="https://github.com/yourusername/yourrepo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost gap-2 bg-base-200 hover:bg-base-300"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </Link>
          )}
        </div>
      </header>

      {/* Main Content - Add padding-top to account for fixed header */}
      <main className="pt-16">{children}</main>
    </div>
  );
}
