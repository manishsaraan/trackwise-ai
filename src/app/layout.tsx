import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

import { Toaster } from 'sonner';
 
import './globals.css';  
import SessionProvider from '@/components/SessionProvider';

const cabinetGrotesk = localFont({
	src: '../assets/fonts/CabinetGrotesk_Complete/Variable/CabinetGrotesk-Variable.ttf',
	variable: '--font-cabinet',
});

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-jakarta',
});

export const metadata: Metadata = {
	title: 'ATS App',
	description: 'Applicant Tracking System',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html data-theme="cmyk" lang="en">
			<body className={`${cabinetGrotesk.variable} ${plusJakartaSans.variable}`}>
				<SessionProvider>					 
						<Toaster />
						<div className="min-h-screen bg-base-100">{children}</div>					 
				</SessionProvider>
			</body>
		</html>
	);
}
