import { StatusTabConfigWithoutIcon } from '@/types/statusTabs';

class StatusTabsFactory {
	private static baseConfig = {
		jobs: {
			ACTIVE: {
				label: 'Active Jobs',
				iconName: 'CheckCircle',
				color: 'success',
				description: 'Currently accepting applications',
			},
			CLOSED: {
				label: 'Closed',
				iconName: 'XCircle',
				color: 'error',
				description: 'No longer accepting applications',
			},
		},
		applicants: {
			ACCEPTED: {
				label: 'Accepted',
				iconName: 'CheckCircle2',
				color: 'success',
				description: 'Accepted candidates',
			},
			IN_REVIEW: {
				label: 'In Review',
				iconName: 'Clock',
				color: 'warning',
				description: 'Applications under review',
			},
			REJECTED: {
				label: 'Rejected',
				iconName: 'XCircle',
				color: 'error',
				description: 'Rejected applications',
			},
		},
	};

	static createStatusTabs(type: 'jobs' | 'applicants', counts?: Record<string, number>): StatusTabConfigWithoutIcon[] {
		const config = this.baseConfig[type];

		return Object.entries(config).map(([id, details]) => ({
			id,
			...details,
			count: counts?.[id.toUpperCase()] ?? 0,
		}));
	}
}

export default StatusTabsFactory;
