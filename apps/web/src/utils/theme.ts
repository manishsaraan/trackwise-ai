export const statusColors = {
	ACCEPTED: 'success',
	IN_REVIEW: 'warning',
	REJECTED: 'error',
} as const;

export const statusConfig = {
	ACCEPTED: {
		color: 'success',
		bgColor: 'bg-success/10',
		borderColor: 'border-success/20',
		textColor: 'text-success',
	},
	IN_REVIEW: {
		color: 'warning',
		bgColor: 'bg-warning/10',
		borderColor: 'border-warning/20',
		textColor: 'text-warning',
	},
	REJECTED: {
		color: 'error',
		bgColor: 'bg-error/10',
		borderColor: 'border-error/20',
		textColor: 'text-error',
	},
} as const;
