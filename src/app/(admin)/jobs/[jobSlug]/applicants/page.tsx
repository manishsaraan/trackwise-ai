import React from "react";
import { Clock, XCircle, CheckCircle2 } from "lucide-react";
import StatusTabs from "@/app/components/StatusTabs";
import ApplicantCard from "./ApplicantCard";
import { getAllApplicants } from "@/app/actions/applicant";
import { getJobBySlug } from "@/app/actions";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: { jobSlug: string };
  searchParams: { status?: string };
}) {
  const job = await getJobBySlug(params.jobSlug);
  const status = searchParams.status || "ACCEPTED";
  console.log(status, "************status");
  const applicants = await getAllApplicants(status);

  const statusTabs = [
    {
      id: "ACCEPTED",
      label: "Accepted",
      count: job?.acceptedCount,
      iconName: "CheckCircle2",
      color: "success",
      description: "Accepted candidates",
    },
    {
      id: "IN_REVIEW",
      label: "In Review",
      count: job?.inReviewCount,
      iconName: "Clock",
      color: "warning",
      description: "Applications under review",
    },
    {
      id: "REJECTED",
      label: "Rejected",
      count: job?.rejectedCount,
      iconName: "XCircle",
      color: "error",
      description: "Rejected applications",
    },
  ];

  const onSelectTab = (tabId: string) => {
    console.log(tabId);
  };

  console.log(applicants, "************applicants");
  const { success, applicants: applicantsData } = applicants;
  return (
    <>
      <div className="min-h-screen bg-base-100">
        {/* Header Section */}
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

            <Suspense>
              <StatusTabs statusTabs={statusTabs} defaultTab={status} />
            </Suspense>
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
