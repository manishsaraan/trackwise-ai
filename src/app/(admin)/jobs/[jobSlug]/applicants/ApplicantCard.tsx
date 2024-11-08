"use client";

import React, { useState } from "react";
import {
  Brain,
  Briefcase,
  Eye,
  ArrowUpDown,
  MoreHorizontal,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Linkedin,
  Globe,
  FileText,
} from "lucide-react";
import ContactInfo from "./ContactInfo";

interface Applicant {
  id: number;
  name: string;
  location: string;
  position: string;
  experience: string;
  appliedDate: string;
  aiStatus: "passed" | "rejected" | "IN_REVIEW";
  aiAssessment: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
  email: string;
  phone: string;
  status: "accepted" | "IN_REVIEW" | "rejected" | undefined;
  technical_skills: string[];
  immediateJoiner: boolean;
}

const getAIStatusDetails = (status: Applicant["aiStatus"]) => {
  switch (status) {
    case "passed":
      return {
        label: "AI Passed",
        color: "success",
        Icon: CheckCircle2,
      };
    case "rejected":
      return {
        label: "AI Rejected",
        color: "error",
        Icon: XCircle,
      };
    case "IN_REVIEW":
      return {
        label: "Review Required",
        color: "warning",
        Icon: AlertCircle,
      };
  }
};

export default function ApplicantCard({ applicant }: { applicant: any }) {
  const {
    resumeData: { personalInformation, technicalSkills, workExperience },
  } = applicant;

  const getCurrentPosition = (workExperience: any) => {
    if (workExperience.length === 0) {
      return "N/A";
    }
    if (!workExperience[0].job_title) {
      return "N/A";
    }

    if (!workExperience[0].company_name) {
      return workExperience[0].job_title;
    }
    return `${workExperience[0].job_title} at ${workExperience[0].company_name}`;
  };

  return (
    <div
      key={applicant.id}
      className="card bg-base-100 border border-base-200 hover:border-base-300 transition-colors"
    >
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">
                {applicant.firstName} {applicant.lastName}
              </h3>
              {applicant.status && (
                <div
                  className={`badge gap-1.5 badge-${
                    getAIStatusDetails(applicant.status)?.color
                  }`}
                >
                  {React.createElement(
                    getAIStatusDetails(applicant.status)?.Icon,
                    {
                      className: "w-3 h-3",
                    }
                  )}
                  <span className="text-xs">
                    {getAIStatusDetails(applicant.status)?.label}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {getCurrentPosition(workExperience)}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-1">
                {technicalSkills
                  .slice(0, 5)
                  .map((skill: string, index: number) => (
                    <span key={index} className="badge badge-ghost badge-sm">
                      {skill}
                    </span>
                  ))}
                {technicalSkills.length > 5 && (
                  <span className="badge badge-ghost badge-sm">
                    +{technicalSkills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
              <ExternalLinks
                applicant={applicant}
                linkedinUrl={personalInformation.linkedin_profile}
                websiteUrl={personalInformation.portfolio_website}
                resumeUrl={applicant.resumeUrl}
              />

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm">
                  <MoreHorizontal className="w-4 h-4" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
                >
                  {applicant.status === "IN_REVIEW" && (
                    <>
                      <li>
                        <a>
                          <CheckCircle2 className="w-4 h-4" />
                          Accept Applicant
                        </a>
                      </li>
                      <li>
                        <a>
                          <XCircle className="w-4 h-4" />
                          Reject Applicant
                        </a>
                      </li>
                    </>
                  )}
                  {applicant.status === "accepted" && (
                    <li>
                      <a>
                        <XCircle className="w-4 h-4" />
                        Reject Applicant
                      </a>
                    </li>
                  )}
                  {applicant.status === "rejected" && (
                    <>
                      <li>
                        <a>
                          <AlertCircle className="w-4 h-4" />
                          In Review
                        </a>
                      </li>
                      <li>
                        <a>
                          <CheckCircle2 className="w-4 h-4" />
                          Accept Applicant
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ContactInfo icon={Mail} value={applicant.email} label="Email" />
              <ContactInfo
                icon={Phone}
                value={personalInformation.phone_number}
                label="Phone"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-base-200 pt-4">
          <div
            className={`rounded-lg p-4 ${
              applicant.aiStatus === "passed"
                ? "bg-success/5 border border-success/20"
                : applicant.aiStatus === "review_required"
                ? "bg-warning/5 border border-warning/20"
                : "bg-error/5 border border-error/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  applicant.aiStatus === "passed"
                    ? "bg-success/10"
                    : applicant.aiStatus === "review_required"
                    ? "bg-warning/10"
                    : "bg-error/10"
                }`}
              >
                <Brain
                  className={`w-5 h-5 ${
                    applicant.aiStatus === "passed"
                      ? "text-success"
                      : applicant.aiStatus === "review_required"
                      ? "text-warning"
                      : "text-error"
                  }`}
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">AI Assessment</h4>
                  </div>
                </div>

                <div className="text-sm text-base-content/70">
                  {applicant.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExternalLinks = ({
  applicant,
  linkedinUrl,
  websiteUrl,
  resumeUrl,
}: {
  applicant: Applicant;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
}) => {
  // Add helper function to ensure URLs have protocol
  const ensureProtocol = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  const links = [
    {
      url: ensureProtocol(linkedinUrl),
      icon: Linkedin,
      label: "View LinkedIn Profile",
      className: "text-[#0A66C2]",
      onClick: () => window.open(ensureProtocol(linkedinUrl), "_blank"),
    },
    {
      url: ensureProtocol(websiteUrl),
      icon: Globe,
      label: "Visit Website",
      className: "text-primary",
      onClick: () => window.open(ensureProtocol(websiteUrl), "_blank"),
    },
    {
      url: ensureProtocol(resumeUrl),
      icon: FileText,
      label: "View Resume",
      className: "text-base-content",
      onClick: () => window.open(ensureProtocol(resumeUrl), "_blank"),
    },
  ].filter((link) => link.url);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {links.map(({ url, icon: Icon, label, className, onClick }) => (
        <div key={label} className="tooltip tooltip-bottom" data-tip={label}>
          <button
            onClick={onClick}
            className="btn btn-ghost btn-sm hover:bg-base-200"
          >
            <Icon className={`w-4 h-4 ${className}`} />
          </button>
        </div>
      ))}
    </div>
  );
};
