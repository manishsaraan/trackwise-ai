'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Settings, ChevronDown } from 'lucide-react';

export default function TopNavBar() {
	const { data: session } = useSession();

	return (
		<header className="w-full bg-base-100 shadow-md">
			<div className="mx-auto flex items-center justify-between py-4 px-6">
				<Link href="/" className="text-2xl font-bold">
					TrackWiseAI
				</Link>
				
				<div className="dropdown dropdown-end">
					<div 
						tabIndex={0} 
						role="button" 
						className="btn btn-ghost flex items-center gap-2 px-4"
					>
						{/* Avatar */}
						<div className="avatar placeholder">
							<div className="w-8 rounded-full bg-primary/10">
								<span className="text-sm font-semibold text-primary">
									{session?.user?.email?.[0].toUpperCase()}
								</span>
							</div>
						</div>
						
						{/* Email Display */}
						<div className="flex flex-col items-start">
							<span className="text-sm font-medium">
								{session?.user?.email?.split('@')[0]}
							</span>
							<span className="text-xs text-base-content/60">
								{session?.user?.email}
							</span>
						</div>
						
						<ChevronDown className="w-4 h-4 text-base-content/70" />
					</div>

					<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<Link href="/profile" className="flex items-center gap-2">
								<Settings className="w-4 h-4" />
								Profile Settings
							</Link>
						</li>
						<div className="divider my-0"></div>
						<li>
							<button 
								onClick={() => signOut({ callbackUrl: '/login' })}
								className="text-error"
							>
								<LogOut className="w-4 h-4" />
								Sign Out
							</button>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
