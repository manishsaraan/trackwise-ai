import React from 'react';

import { getJobBySlug } from '@/app/actions';
import { getAllApplicants } from '@/app/actions/applicant';
import StatusTabs from '@/components/status-tabs';
import StatusTabsFactory from '@/factories/statusTabsFactory';

import ApplicantCard from './ApplicantCard';

type ApplicantStatus = 'PENDING' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED';

// Add interfaces for the data structures
interface Job {
	id: number;
	title: string;
	acceptedCount?: number;
	inReviewCount?: number;
	rejectedCount?: number;
}

interface Applicant {
	id: number;
	status: ApplicantStatus;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	jobApplicationId: number;
	firstName: string;
	lastName: string;
	phone: string;
	aiProcessed: boolean;
}

export default async function ApplicantsPage({
	params,
	searchParams,
}: {
	params: { jobSlug: string };
	searchParams: { status?: string };
}): Promise<JSX.Element> {
	const job: Job | null = await getJobBySlug(params.jobSlug);
	const status = searchParams.status || 'ACCEPTED';
	const applicants: any = await getAllApplicants({ status, jobId: job?.id || 0 });

	const statusTabs = StatusTabsFactory.createStatusTabs('applicants', {
		ACCEPTED: job?.acceptedCount || 0,
		IN_REVIEW: job?.inReviewCount || 0,
		REJECTED: job?.rejectedCount || 0,
	} as const) as {
		id: string;
		label: string;
		count?: number;
		iconName: 'CheckCircle2' | 'Clock' | 'XCircle' | 'CheckCircle';
		color: string;
		description: string;
	}[];

	const { success, data: applicantsData } = applicants;

	return (
		<>
			<div className="min-h-screen bg-base-100">
				<div className="">
					<div className="max-w-7xl mx-auto p-6">
						<div className="flex justify-between items-center">
							<div>
								<h1 className="text-4xl font-bold mb-4">Applicants</h1>
								<p className="text-base-content/60 text-sm mt-1">Manage applications for <b>{job?.title}</b></p>
							</div>
						</div>

						<StatusTabs statusTabs={statusTabs} defaultTab={status} />
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-7xl mx-auto p-6">
					{!success ? (
						<div className="text-center py-10">
							<p className="text-base-content/60">Error fetching applicants</p>
						</div>
					) : applicantsData.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-base-content/60">No applicants found</p>
						</div>
					) : (
						<div className="space-y-4">
							{applicantsData.map((applicant: Applicant) => (
								<ApplicantCard key={applicant.id} applicant={applicant} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
