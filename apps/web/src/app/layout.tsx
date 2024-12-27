import type { Metadata } from 'next';
import { cabinetGrotesk, plusJakartaSans } from '@ats/fonts';
import { Toaster } from 'sonner';
import SessionProvider from '@/components/context/session-provider';
 
import './globals.css';  

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
