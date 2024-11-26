import { notFound } from 'next/navigation';

import { getJobBySlug } from '@/app/actions';
import { Briefcase, Building2, Calendar, Clock, DollarSign, ExternalLink, Globe, Linkedin, MapPin } from 'lucide-react';

import { JobApplicationForm } from './JobApplicationForm';

async function JobApplicationPage({ params }: { params: { jobSlug: string } }) {
	const jobData = await getJobBySlug(params.jobSlug);

	if (!jobData) {
		notFound();
	}

	// Assuming this comes from your company profile or environment
	const companyInfo = {
		name: 'Xyx Corp',
		founded: 2020,
		logo: '/company-logo.png',
		location: 'New York, NY',
		website: 'https://company-website.com',
		linkedin: 'https://linkedin.com/company/company-name',
		about: "We're building innovative solutions that transform businesses...",
	};

	return (
		<div className="min-h-screen bg-base-200">
			{/* Company Header Banner */}
			<div className="bg-base-100 border-b border-base-200">
				<div className="max-w-4xl mx-auto py-8 px-4">
					<div className="flex flex-col md:flex-row items-start gap-6">
						{/* Company Logo */}
						<div className="w-16 h-16 rounded-lg bg-base-200 flex items-center justify-center">
							<img src="/api/placeholder/64/64" alt={companyInfo.name} className="w-12 h-12 rounded" />
						</div>

						{/* Company Info */}
						<div className="flex-1">
							<h1 className="text-2xl font-bold mb-2">{companyInfo.name}</h1>
							<p className="text-base-content/70 max-w-2xl mb-4">{companyInfo.about}</p>
							<div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
								<span className="flex items-center gap-2">
									<Building2 className="w-4 h-4" />
									{companyInfo.location}
								</span>
								<span className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									Founded {companyInfo.founded}
								</span>
								<a
									href={companyInfo.website}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 hover:text-primary transition-colors"
								>
									<Globe className="w-4 h-4" />
									Website
									<ExternalLink className="w-3 h-3" />
								</a>
								<a
									href={companyInfo.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 hover:text-primary transition-colors"
								>
									<Linkedin className="w-4 h-4" />
									LinkedIn
									<ExternalLink className="w-3 h-3" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto py-8 px-4">
				{/* Job Details Card */}
				<div className="card bg-base-100 shadow-xl mb-8">
					<div className="card-body">
						<div className="space-y-6">
							{/* Job Title and Meta */}
							<div>
								<h2 className="text-2xl font-bold mb-3">{jobData.title}</h2>
								<div className="flex flex-wrap gap-4 text-base-content/70">
									<div className="badge badge-outline gap-2">
										<Briefcase className="w-4 h-4" />
										{jobData.position}
									</div>
									<div className="badge badge-outline gap-2">
										<MapPin className="w-4 h-4" />
										{jobData.location}
									</div>
									<div className="badge badge-outline gap-2">
										<DollarSign className="w-4 h-4" />
										{jobData.salary}
									</div>
									<div className="badge badge-outline gap-2">
										<Clock className="w-4 h-4" />
										{jobData.workMode}
									</div>
								</div>
							</div>

							{/* Job Details */}
							<div className="prose max-w-none">
								<div className="mb-6">
									<h3 className="text-lg font-semibold mb-3">Job Description</h3>
									<pre className="text-base-content/70 whitespace-pre-wrap font-sans">{jobData.description}</pre>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-3">Experience Required</h3>
									<p className="text-base-content/70">{jobData.experienceRange}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Application Form */}
				<JobApplicationForm jobId={jobData.id} questions={jobData.questions} />
			</div>
		</div>
	);
}

export default JobApplicationPage;
