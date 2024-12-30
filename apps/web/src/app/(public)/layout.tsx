import Navigation from '@/components/topbar';

interface PublicLayoutProps {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main className="pt-16">{children}</main>
		</div>
	);
}
