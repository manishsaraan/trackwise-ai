import type { Metadata } from 'next';

import Navigation from '@/app/components/navigation';
import Footer from '@/app/components/ui/footer';
import Sidebar from '@/app/components/ui/sidebar';
import { stackServerApp } from '@/stack';

import { ensureOnboarded } from '../actions/onboarding-functions';
import '../globals.css';

export const metadata: Metadata = {
	title: 'ATS App',
	description: 'Applicant Tracking System',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await stackServerApp.getUser({ or: 'redirect' });
	await ensureOnboarded();
	return (
		<div className="flex flex-col min-h-screen">
			{/* Top Navigation - Full Width */}
			<Navigation />

			{/* Main Content Area with Sidebar */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<Sidebar />

				{/* Content Area */}
				<main className="flex-1">
					<div className="flex flex-col min-h-[calc(100vh-64px)]">
						{' '}
						{/* Adjust 64px based on your navbar height */}
						<div className="flex-1 mt-11">{children}</div>
						<Footer />
					</div>
				</main>
			</div>
		</div>
	);
}
