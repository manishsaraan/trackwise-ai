import React from "react";
import StatusTabsFactory from "@/factories/statusTabsFactory";
import StatusTabs from "@/app/components/StatusTabs";
import ApplicantCard from "./ApplicantCard";
import { getAllApplicants } from "@/app/actions/applicant";
import { getJobBySlug } from "@/app/actions";

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: { jobSlug: string };
  searchParams: { status?: string };
}) {
  const job = await getJobBySlug(params.jobSlug);
  const status = searchParams.status || "ACCEPTED";
  const applicants = await getAllApplicants(status);

  const statusTabs = StatusTabsFactory.createStatusTabs("applicants", {
    ACCEPTED: job?.acceptedCount,
    IN_REVIEW: job?.inReviewCount,
    REJECTED: job?.rejectedCount,
  });

  const { success, applicants: applicantsData } = applicants;
  return (
    <>
      <div className="min-h-screen bg-base-100">
        <div className="border-b border-base-200">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Applicants</h1>
                <p className="text-base-content/60 text-sm mt-1">
                  Manage applications for Full Stack Developer
                </p>
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
              {applicantsData.map((applicant) => (
                <ApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
