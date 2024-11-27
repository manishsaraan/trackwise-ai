import Link from 'next/link';

import { getAllJobs } from '@/app/actions';
import StatusTabs from '@/app/components/StatusTabs';
import StatusTabsFactory from '@/factories/statusTabsFactory';
import { JobStatus } from '@prisma/client';
import { Plus } from 'lucide-react';

import JobListingsClient from './JobListingsClient';

async function JobListingsDashboard({ searchParams: { status } }: { searchParams: { status?: string } }) {
	const jobs = await getAllJobs(status as JobStatus);

	const { jobs: jobsData, success } = jobs;

	const transformedJobs = jobsData?.map(job => ({
		...job,
		posted: job.createdAt.toISOString(),
		createdAt: job.createdAt.toISOString(),
	}));

	const statusTabs = StatusTabsFactory.createStatusTabs('jobs', {
		ACTIVE: transformedJobs?.filter(job => job.status === 'ACTIVE').length || 0,
		CLOSED: transformedJobs?.filter(job => job.status === 'CLOSED').length || 0,
	}) as {
		id: string;
		label: string;
		count?: number;
		iconName: 'CheckCircle2' | 'Clock' | 'XCircle' | 'CheckCircle';
		color: string;
		description: string;
	}[];

	return (
		<div className="min-h-screen bg-base-100">
			<div className="">
				<div className="max-w-7xl mx-auto p-6">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-4xl font-bold">Job Listings</h1>
							<p className="text-base-content/60 text-sm mt-1">Manage your job postings and applications</p>
						</div>
						<Link href="/jobs/create" className="btn btn-primary">
							<Plus className="w-4 h-4" />
							Post New Job
						</Link>
					</div>

					{/* Status Tabs */}

					<StatusTabs statusTabs={statusTabs} defaultTab={statusTabs[0].id} />

					<div className="max-w-7xl mx-auto py-6">
						{!success ? (
							<div className="flex justify-center items-center h-40">Error fetching jobs</div>
						) : jobsData?.length === 0 ? (
							<div className="text-center py-10">
								<p className="text-base-content/60">No jobs found</p>
							</div>
						) : (
							<div className="space-y-4">
								<JobListingsClient initialJobs={transformedJobs!} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobListingsDashboard;
