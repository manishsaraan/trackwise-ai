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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateApplicantStatus } from "@/app/actions/applicant";
import { statusConfig } from "@/utils/theme";

interface Applicant {
  id: number;
  name: string;
  location: string;
  position: string;
  experience: string;
  appliedDate: string;
  aiStatus: "PASSED" | "REJECTED" | "IN_REVIEW";
  aiAssessment: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
  email: string;
  phone: string;
  status: "ACCEPTED" | "IN_REVIEW" | "REJECTED" | undefined;
  technical_skills: string[];
  immediateJoiner: boolean;
}

const getAIStatusDetails = (status: Applicant["status"]) => {
  switch (status) {
    case "ACCEPTED":
      return {
        label: "Accepted",
        color: "success",
        Icon: CheckCircle2,
      };
    case "REJECTED":
      return {
        label: "Rejected",
        color: "warning",
        Icon: XCircle,
      };
    case "IN_REVIEW":
      return {
        label: "In Review",
        color: "error",
        Icon: AlertCircle,
      };
    default:
      return {
        label: "Unknown",
        color: "ghost",
        Icon: AlertCircle,
      };
  }
};

export default function ApplicantCard({ applicant }: { applicant: any }) {
  const router = useRouter();
  const status = statusConfig[applicant.status as keyof typeof statusConfig];

  const handleStatusChange = async (
    newStatus: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const result = await updateApplicantStatus(applicant.id, newStatus);

      if (result.success) {
        toast.success(`Status updated to ${newStatus.toLowerCase()}`, {
          description: `Applicant ${applicant.firstName} ${
            applicant.lastName
          } has been ${newStatus.toLowerCase()}.`,
          position: "top-right",
          icon: "✅",
        });
        router.refresh();
      } else {
        toast.error("Failed to update status", {
          description: result.error || "Please try again later.",
          position: "top-right",
          icon: "❌",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Failed to update applicant status. Please try again later.",
        position: "top-right",
        icon: "❌",
      });
    }
  };

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
    <div className="card bg-base-100 border border-base-400/80 hover:border-base-500/90 transition-colors">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-heading text-text-primary font-medium">
                {applicant.firstName} {applicant.lastName}
              </h3>
              {applicant.status && (
                <div
                  className={`badge gap-1.5 ${status.bgColor} ${status.borderColor}`}
                >
                  {React.createElement(
                    getAIStatusDetails(applicant.status)?.Icon,
                    {
                      className: `w-3 h-3 ${status.textColor}`,
                    }
                  )}
                  <span className={`text-xs ${status.textColor}`}>
                    {getAIStatusDetails(applicant.status)?.label}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-text-body">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {getCurrentPosition(workExperience)}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-1">
                {technicalSkills
                  .slice(0, 5)
                  .map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="badge border-base-400/80 badge-ghost badge-sm text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                {technicalSkills.length > 5 && (
                  <span className="badge badge-ghost badge-sm text-text-muted">
                    +{technicalSkills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <ExternalLinks
              applicant={applicant}
              linkedinUrl={personalInformation.linkedin_profile}
              websiteUrl={personalInformation.portfolio_website}
              resumeUrl={applicant.resumeUrl}
            />

            <div className="flex flex-col gap-2">
              <ContactInfo
                icon={Mail}
                value={applicant.email}
                label="Email"
                className="text-text-secondary"
              />
              <ContactInfo
                icon={Phone}
                value={personalInformation.phone_number}
                label="Phone"
                className="text-text-secondary"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-base-200 pt-4">
          <div
            className={`rounded-lg p-4 ${status.bgColor} ${status.borderColor}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${status.bgColor}`}>
                <Brain className={`w-5 h-5 ${status.textColor}`} />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-text-primary">
                      AI Assessment
                    </h4>
                  </div>
                </div>

                <div className="text-sm text-text-body">
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
