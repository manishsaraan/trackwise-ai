"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Users,
  MapPin,
  Brain,
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
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import ApplicantCard from "./ApplicantCard";
import { getAllApplicants } from "@/app/actions/applicant";
import { getJobBySlug } from "@/app/actions";
import { Job } from "@/types/job";

// Types
interface StatisticItemProps {
  count: number;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface Applicant {
  id: number;
  name: string;
  location: string;
  position: string;
  experience: string;
  appliedDate: string;
  aiStatus: "passed" | "rejected" | "review_required";
  aiAssessment: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
  email: string;
  phone: string;
  status: "accepted" | "in-review" | "rejected" | undefined;
  technical_skills: string[];
  immediateJoiner: boolean;
}

const dummyQuestions = [
  {
    question: "What interests you most about this position?",
    answer:
      "I'm particularly excited about the opportunity to work with cutting-edge technologies and contribute to large-scale applications. The company's focus on innovation and its commitment to professional development align perfectly with my career goals.",
  },
  {
    question:
      "Describe a challenging project you've worked on and how you handled it.",
    answer:
      "I led the migration of a monolithic application to a microservices architecture. The main challenge was ensuring zero downtime during the transition. I implemented a staged migration approach, used feature flags, and conducted extensive testing. The project was successfully completed ahead of schedule with minimal disruption to users.",
  },
  {
    question: "What's your experience with our tech stack?",
    answer:
      "I have 4+ years of experience with React, TypeScript, and Node.js. I've built and maintained several production applications using these technologies. I'm also familiar with Next.js and have experience with GraphQL APIs.",
  },
  {
    question: "How do you handle tight deadlines?",
    answer:
      "I prioritize tasks based on impact and urgency, communicate proactively with stakeholders, and break down large tasks into manageable chunks. If needed, I'm comfortable putting in extra hours to meet critical deadlines while maintaining code quality.",
  },
];
// Main Page Component
export default function ApplicantsPage({
  params,
}: {
  params: { jobSlug: string };
}) {
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [applicants, setApplicants] = useState<any[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  useEffect(() => {
    getApplicants();
    getJob();
  }, []);
  // Define styles

  const getJob = async () => {
    const job = await getJobBySlug(params.jobSlug);
    if (job) {
      setJob(job);
    }
  };

  const getApplicants = async () => {
    const applicants = await getAllApplicants();
    if (applicants.success) {
      setApplicants(applicants.applicants);
    }
  };

  const statusTabs = [
    {
      id: "accepted",
      label: "Accepted",
      count: job?.acceptedCount,
      icon: CheckCircle2,
      color: "success",
      description: "Accepted candidates",
    },
    {
      id: "IN_REVIEW",
      label: "In Review",
      count: job?.inReviewCount,
      icon: Clock,
      color: "warning",
      description: "Applications under review",
    },
    {
      id: "rejected",
      label: "Rejected",
      count: job?.rejectedCount,
      icon: XCircle,
      color: "error",
      description: "Rejected applications",
    },
  ];

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
          ) : applicants.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base-content/60">No applicants found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applicants.map((applicant) => (
                <ApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add the modal */}
      {selectedApplicant && (
        <ApplicationDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApplicant(null);
          }}
          applicant={{
            name: selectedApplicant.name,
            resumeUrl:
              "https://1xqijlcbl8outl7j.public.blob.vercel-storage.com/SACHIN-HANS%20RESUME(1%20YEAR%20%20MERN%20STACK)-Zn33cd0eFxSP8AYEHl2vN9gwdLGhxN.PDF",
            questions: dummyQuestions,
          }}
        />
      )}
    </>
  );
}
