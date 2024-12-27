import Link from 'next/link';

export const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-sm z-40">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
          TrackWiseAI
        </Link>
      </div>
    </header>
  );
};