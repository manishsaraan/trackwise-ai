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
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Copy,
  Check,
  Linkedin,
  Globe,
  FileText,
} from "lucide-react";
import StatusTabs from "@/app/components/StatusTabs";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface StatisticItemProps {
  count: number;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface Job {
  id: number;
  jobTitle: string;
  location: string;
  position: string;
  workMode: string;
  posted: string;
  priority?: "high" | "normal";
  totalApplicants: number;
  acceptedCount: number;
  rejectedCount: number;
  inReviewCount: number;
  createdAt: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
}

const StatisticItem = ({
  count,
  label,
  icon: Icon,
  color,
}: StatisticItemProps) => (
  <div className="tooltip tooltip-bottom" data-tip={`${count} ${label}`}>
    <div className="flex items-center gap-1.5 px-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="font-medium">{count}</span>
    </div>
  </div>
);

const CopyButton = ({ text, onCopy }: { text: string; onCopy: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="btn btn-ghost btn-xs">
      {copied ? (
        <Check className="w-3 h-3 text-success" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
};

interface ContactInfoProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

const contactButtonStyles = {
  wrapper: "flex items-center gap-2",
  container:
    "flex items-center gap-2 bg-base-200 hover:bg-base-300 transition-colors rounded-lg px-3 py-1.5",
  icon: "w-4 h-4 text-base-content/60",
  text: "text-sm font-medium",
  copyButton: "btn btn-ghost btn-xs p-0 h-auto min-h-0",
  copyIcon: "w-3 h-3",
};

const ContactInfo = ({ icon: Icon, value, label }: ContactInfoProps) => {
  const [showCopied, setShowCopied] = useState(false);

  // Function to mask email and phone
  const getMaskedValue = (value: string, type: "email" | "phone") => {
    if (type === "email") {
      const [username, domain] = value.split("@");
      return `${username.charAt(0)}***@${domain}`;
    } else {
      // For phone, show last 4 digits
      return `•••• ${value.slice(-4)}`;
    }
  };

  return (
    <div className={contactButtonStyles.wrapper}>
      <div className="tooltip tooltip-bottom" data-tip={value}>
        <div className={contactButtonStyles.container}>
          <Icon className={contactButtonStyles.icon} />
          <span className={contactButtonStyles.text}>
            {getMaskedValue(value, label.toLowerCase() as "email" | "phone")}
          </span>
          <div
            className="tooltip"
            data-tip={showCopied ? "Copied!" : "Click to copy"}
          >
            <CopyButton
              text={value}
              onCopy={() => {
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExternalLinksProps {
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
}

const ExternalLinks = ({
  linkedinUrl,
  websiteUrl,
  resumeUrl,
}: ExternalLinksProps) => {
  const links = [
    {
      url: linkedinUrl,
      icon: Linkedin,
      label: "View LinkedIn Profile",
      className: "text-[#0A66C2]", // LinkedIn brand color
    },
    {
      url: websiteUrl,
      icon: Globe,
      label: "Visit Website",
      className: "text-primary",
    },
    {
      url: resumeUrl,
      icon: FileText,
      label: "View Resume",
      className: "text-base-content",
    },
  ].filter((link) => link.url); // Only show links that have URLs

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {links.map(({ url, icon: Icon, label, className }) => (
        <div key={label} className="tooltip tooltip-bottom" data-tip={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm hover:bg-base-200"
          >
            <Icon className={`w-4 h-4 ${className}`} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default function JobListingsClient({
  initialJobs,
}: {
  initialJobs: Job[];
}) {
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

                    <div className="flex items-start gap-4">
                      <ExternalLinks
                        linkedinUrl={job.linkedinUrl}
                        websiteUrl={job.websiteUrl}
                        resumeUrl={job.resumeUrl}
                      />
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-3 px-2">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">
                            {job.totalApplicants}
                          </span>
                          <span className="text-base-content/60 text-sm">
                            applicants
                          </span>
                        </div>

                        <div className="flex items-center divide-x divide-base-200">
                          <StatisticItem
                            count={job.acceptedCount}
                            label="candidates accepted"
                            icon={CheckCircle2}
                            color="text-success"
                          />
                          <StatisticItem
                            count={job.inReviewCount}
                            label="candidates in review"
                            icon={AlertCircle}
                            color="text-warning"
                          />
                          <StatisticItem
                            count={job.rejectedCount}
                            label="candidates rejected"
                            icon={XCircle}
                            color="text-error"
                          />
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
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <ContactInfo icon={Mail} value={job.email} label="Email" />
                    <ContactInfo icon={Phone} value={job.phone} label="Phone" />
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
