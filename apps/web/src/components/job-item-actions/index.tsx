'use client';

import { useRouter } from 'next/navigation';

import { updateJobStatus } from '@/lib/actions/job';
import { DropdownItem, DropdownWrapper } from '@/components/dropdown-options';
import { ArrowUpDown, MoreHorizontal, Users } from 'lucide-react';
import { toast } from 'sonner';

interface JobActionsProps {
	jobId: number;
	jobSlug: string;
	status: string;
	applicantsCount?: number;
}

export default function JobActions({ jobId, jobSlug, status, applicantsCount = 0 }: JobActionsProps) {
	const router = useRouter();
	const isJobClosed = status === 'CLOSED';

	const handleStatusChange = async () => {
		const newStatus = status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';

		try {
			const result = await updateJobStatus(jobId, newStatus);

			if (result.success) {
				toast.success(`Job ${newStatus.toLowerCase()} successfully`, {
					description: `The job posting has been ${newStatus.toLowerCase()}.`,
					position: 'top-right',
					icon: '✅',
				});
				router.refresh();
			} else {
				toast.error(`Failed to ${newStatus.toLowerCase()} job`, {
					description: result.error,
					position: 'top-right',
					icon: '❌',
				});
			}
		} catch (error) {
			toast.error('Something went wrong', {
				description: 'Failed to update job status. Please try again later.',
				position: 'top-right',
				icon: '❌',
			});
		}
	};

	return (
		<DropdownWrapper trigger={<MoreHorizontal className={`w-4 h-4 ${isJobClosed ? 'text-base-content/50' : ''}`} />}>
			<DropdownItem
				icon={Users}
				text="View Applicants"
				onClick={() => router.push(`/jobs/${jobSlug}/applicants`)}
				disabled={isJobClosed}
				disabledMessage="Cannot view applicants for a closed job"
			/>
			<DropdownItem
				icon={ArrowUpDown}
				text={isJobClosed ? 'Reopen Job' : 'Close Job'}
				onClick={handleStatusChange}
				disabled={!isJobClosed && applicantsCount > 0}
				disabledMessage={!isJobClosed && applicantsCount > 0 ? 'Cannot close job with active applicants' : undefined}
			/>
		</DropdownWrapper>
	);
}
