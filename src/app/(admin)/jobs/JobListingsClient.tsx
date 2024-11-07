"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Users,
  MapPin,
  Briefcase,
  Monitor,
  Eye,
  Calendar,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import StatusTabs from "@/app/components/StatusTabs";
import { useRouter } from "next/navigation";

interface JobListingsClientProps {
  initialJobs: any[]; // Replace 'any' with your Job type
}

export default function JobListingsClient({
  initialJobs,
}: JobListingsClientProps) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("active");
  const [filterOpen, setFilterOpen] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [isLoading, setIsLoading] = useState(false);

  const statusTabs = [
    {
      id: "active",
      label: "Active Jobs",
      count: initialJobs.length,
      icon: CheckCircle,
      color: "success",
      description: "Currently accepting applications",
    },

    {
      id: "closed",
      label: "Closed",
      count: 0,
      icon: XCircle,
      color: "error",
      description: "No longer accepting applications",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="border-b border-base-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Job Listings</h1>
              <p className="text-base-content/60 text-sm mt-1">
                Manage your job postings and applications
              </p>
            </div>
            <button
              onClick={() => router.push("/jobs/create")}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          </div>

          {/* Status Tabs */}
          <StatusTabs
            statusTabs={statusTabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-base-content/60">No jobs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="card bg-base-100 border border-base-200 hover:border-base-300 transition-colors"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{job.jobTitle}</h3>
                        {job.priority === "high" && (
                          <div className="badge badge-primary badge-sm">
                            Priority
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.position}
                        </span>
                        <span className="flex items-center gap-1">
                          <Monitor className="w-4 h-4" />
                          {job.workMode}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">
                            10{job.applicants}
                          </span>
                          <span className="text-base-content/60 text-sm">
                            applicants
                          </span>
                        </div>
                      </div>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>
                              <Eye className="w-4 h-4" />
                              View Details
                            </a>
                          </li>
                          <li>
                            <a>
                              <Users className="w-4 h-4" />
                              View Applicants
                            </a>
                          </li>
                          <li>
                            <a>
                              <ArrowUpDown className="w-4 h-4" />
                              Change Status
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
      </div>
    </div>
  );
}
