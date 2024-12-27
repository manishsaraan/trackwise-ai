import { TopBar } from '@ats/ui';

interface PublicLayoutProps {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
	return (
		<div className="min-h-screen">
			<TopBar />
			{/* Main Content - Add padding-top to account for fixed header */}
			<main className="pt-16">{children}</main>
		</div>
	);
}
