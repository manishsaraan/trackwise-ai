'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { statusConfig } from '@/utils/theme';
import { CheckCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

const iconMap = {
	CheckCircle2: CheckCircle2,
	Clock: Clock,
	XCircle: XCircle,
	CheckCircle: CheckCircle,
};

interface StatusTabsProps {
	statusTabs: Array<{
		id: string;
		label: string;
		count?: number;
		iconName: keyof typeof iconMap;
		color: string;
		description: string;
	}>;
	defaultTab: string;
}

export default function StatusTabs({ statusTabs, defaultTab }: StatusTabsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentStatus = searchParams.get('status') || defaultTab;

	const onClick = (tabId: string) => {
		router.push(`?status=${tabId}`);
	};

	const config = statusConfig[currentStatus as keyof typeof statusConfig];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
			{statusTabs.map(({ id, label, count, iconName, description }) => {
				const IconComponent = iconMap[iconName];
				return (
					<button
						key={id}
						onClick={() => onClick(id)}
						className={`
            relative p-4 rounded-lg border-2 transition-all
            ${currentStatus === id ? 'bg-base-200 border-primary' : 'bg-base-100 border-base-200 hover:bg-base-200/50'}
            flex items-center gap-4
          `}
					>
						<div
							className={`
              w-12 h-12 rounded-lg flex items-center justify-center
              ${currentStatus === id ? 'bg-primary/10' : 'bg-base-200'}
            `}
						>
							<IconComponent className={`w-6 h-6 ${currentStatus === id ? 'text-primary' : 'text-base-content/70'}`} />
						</div>

						<div className="text-left">
							<div className="flex items-center gap-2">
								<span className="font-medium">{label}</span>
								<span
									className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${currentStatus === id ? 'bg-primary/10 text-primary' : 'bg-base-200 text-base-content/70'}
                `}
								>
									{count}
								</span>
							</div>
							<p className="text-sm text-base-content/60 mt-0.5">{description}</p>
						</div>

						{currentStatus === id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
					</button>
				);
			})}
		</div>
	);
}
