import { getAllJobs } from "@/app/actions";
import JobListingsClient from "./JobListingsClient";
import { Plus } from "lucide-react";
import Link from "next/link";
import StatusTabsFactory from "@/factories/statusTabsFactory";
import StatusTabs from "@/app/components/StatusTabs";

async function JobListingsDashboard({
  searchParams: { status },
}: {
  searchParams: { status?: string };
}) {
  const jobs = await getAllJobs(status);
  const { jobs: jobsData, success } = jobs;

  const statusTabs = StatusTabsFactory.createStatusTabs("jobs", {
    ACTIVE: jobsData.filter((job) => job.status === "ACTIVE").length,
    CLOSED: jobsData.filter((job) => job.status === "CLOSED").length,
  });

  return (
    <div className="min-h-screen bg-base-100">
      <div className="border-b border-base-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Job Listings</h1>
              <p className="text-base-content/60 text-sm mt-1">
                Manage your job postings and applications
              </p>
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
              <div className="flex justify-center items-center h-40">
                Error fetching jobs
              </div>
            ) : jobsData?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-base-content/60">No jobs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                <JobListingsClient initialJobs={jobsData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingsDashboard;
