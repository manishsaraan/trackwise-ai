import JobForm from '@/components/JobForm';
import { ArrowLeft, Info, Plus } from 'lucide-react';

export default function JobCreationPage(): JSX.Element {
	return (
		<div className="min-h-screen bg-base-100">
			<div className="">
				<div className="max-w-7xl mx-auto p-6">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-4xl font-bold mb-4">Create a New Job</h1>
							<p className="text-base-content/60 text-sm mt-1">
								Fill out the form to post a new job opportunity and attract qualified candidates.
							</p>
						</div>
						<a href="/jobs" className="btn btn-primary">
							<ArrowLeft className="w-4 h-4" />
							Back to My Jobs
						</a>
					</div>

					<div className="bg-base-200 p-6 rounded-lg mb-8">
						<div className="flex items-center gap-2 mb-4">
							<Info className="w-5 h-5 text-base-content/60" />
							<h2 className="text-xl font-bold">Tips for Creating an Effective Job Posting</h2>
						</div>
						<ul className="list-disc pl-6 text-base-content/80">
							<li>
								Provide a clear and detailed job description to help candidates understand the role and
								responsibilities.
							</li>
							<li>Specify the required qualifications, skills, and experience to attract the right candidates.</li>
							<li>
								Include information about the company, work environment, and benefits to make the job more appealing.
							</li>
							<li>Consider adding custom questions to assess candidates&apos; fit for the role.</li>
							<li>Review the job posting thoroughly before publishing to ensure accuracy and completeness.</li>
						</ul>
					</div>
					<div className="card bg-base-100 mt-4 py-6 shadow-xl">
						<div className="card-body">
							<JobForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
