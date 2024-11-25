import React from "react";
import StatusTabsFactory from "@/factories/statusTabsFactory";
import StatusTabs from "@/app/components/StatusTabs";
import ApplicantCard from "./ApplicantCard";
import { getAllApplicants } from "@/app/actions/applicant";
import { getJobBySlug } from "@/app/actions";

type ApplicantStatus = "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";

// Add interfaces for the data structures
interface Job {
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

interface ApplicantResponse {
  success: boolean;
  applicants: Applicant[];
  error?: string;
}

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: { jobSlug: string };
  searchParams: { status?: string };
}): Promise<JSX.Element> {
  const job: Job | null = await getJobBySlug(params.jobSlug);
  const status = searchParams.status || "ACCEPTED";
  const applicants: any = await getAllApplicants(status as ApplicantStatus);

  const statusTabs = StatusTabsFactory.createStatusTabs("applicants", {
    ACCEPTED: job?.acceptedCount || 0,
    IN_REVIEW: job?.inReviewCount || 0,
    REJECTED: job?.rejectedCount || 0,
  } as const) as { 
    id: string; 
    label: string; 
    count?: number; 
    iconName: "CheckCircle2" | "Clock" | "XCircle" | "CheckCircle";
    color: string;
    description: string;
  }[];

  const { success, applicants: applicantsData } = applicants;
  return (
    <>
      <div className="min-h-screen bg-base-100">
        <div className="">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold">Applicants</h1>
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
