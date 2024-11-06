import { getJobBySlug } from "@/app/actions";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "./JobApplicationForm";

async function JobApplicationPage({ params }: { params: { jobSlug: string } }) {
  const jobData = await getJobBySlug(params.jobSlug);

  if (!jobData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Job Details Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-2xl">{jobData.title}</h2>
                  <p className="text-base-content/70">{jobData.company}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-base-content/70">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {jobData.position}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {jobData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {jobData.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {jobData.workMode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Job Description</h3>
                <pre className="mt-2 text-base-content/70 whitespace-pre-wrap font-sans">
                  {jobData.description}
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Experience Required</h3>
                <p className="mt-2 text-base-content/70">
                  {jobData.experienceRange}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <JobApplicationForm questions={jobData.questions} />
      </div>
    </div>
  );
}

export default JobApplicationPage;
