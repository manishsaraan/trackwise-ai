'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, Mail, Shield } from 'lucide-react';

function ProfilePage() {
	const { data: session } = useSession();

	return (
		<div className="max-w-3xl mx-auto p-6">
			{/* Profile Header Card */}
			<div className="card bg-base-100 shadow-xl mb-6">
				<div className="card-body">
					<div className="flex items-center gap-6">
						{/* Avatar */}
						<div className="avatar placeholder">
							<div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 ring-2 ring-primary/10">
								<span className="text-3xl font-semibold text-primary">
									{session?.user?.email?.[0].toUpperCase()}
								</span>
							</div>
						</div>
						
						{/* User Info */}
						<div className="flex-1">
							<h1 className="text-2xl font-bold mb-1">
								{session?.user?.email?.split('@')[0]}
							</h1>
							<div className="flex items-center gap-2 text-base-content/70">
								<Mail className="w-4 h-4" />
								<span className="text-sm">{session?.user?.email}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Account Details Card */}
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
						<Shield className="w-5 h-5 text-primary" />
						Account Details
					</h2>

					{/* Account Info Grid */}
					<div className="grid gap-6">
						{/* Email Section */}
						<div className="flex flex-col gap-1.5">
							<label className="text-sm font-medium text-base-content/70">
								Email Address
							</label>
							<div className="flex items-center gap-2">
								<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<Mail className="w-5 h-5 text-primary" />
								</div>
								<div className="flex-1">
									<div className="font-medium">{session?.user?.email}</div>
									<div className="text-xs text-base-content/60">Primary email</div>
								</div>
							</div>
						</div>

						{/* Account Status */}
						<div className="flex flex-col gap-1.5">
							<label className="text-sm font-medium text-base-content/70">
								Account Status
							</label>
							<div className="flex items-center gap-2">
								<div className="badge badge-success gap-1">
									<Shield className="w-3 h-3" />
									Active
								</div>
							</div>
						</div>

						{/* Divider */}
						<div className="divider my-2"></div>

						{/* Logout Section */}
						<div className="flex flex-col gap-4">
							<div>
								<h3 className="text-sm font-medium text-base-content/70 mb-1">
									Sign Out
								</h3>
								<p className="text-sm text-base-content/60">
									Sign out from your account across all devices
								</p>
							</div>
							<button 
								onClick={() => signOut({ callbackUrl: '/login' })} 
								className="btn btn-error btn-outline gap-2 w-fit"
							>
								<LogOut className="w-4 h-4" />
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
