"use client";
import React, { useState } from "react";
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

// Types
interface StatisticItemProps {
  count: number;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface AIMatch {
  score: number;
  label: "Excellent" | "Good" | "Average" | "Low";
  color: "success" | "primary" | "warning" | "error";
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

// Utility Components
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

// Add this helper function to get AI match details
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
    case "review_required":
      return {
        label: "Review Required",
        color: "warning",
        Icon: AlertCircle,
      };
  }
};
const dummyQuestions: Question[] = [
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
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  // Define styles
  const contactButtonStyles = {
    wrapper: "flex flex-col gap-2",
    container:
      "flex items-center gap-2 bg-base-200 hover:bg-base-300 transition-colors rounded-lg px-3 py-1.5 w-[220px]",
    icon: "w-4 h-4 text-base-content/60 shrink-0",
    text: "text-sm font-medium truncate",
    copyWrapper: "ml-auto shrink-0",
    copyButton: "btn btn-ghost btn-xs p-0 h-auto min-h-0",
    copyIcon: "w-3 h-3",
  };

  // Sample data - replace with actual data fetching
  const initialApplicants: Applicant[] = [
    {
      id: 1,
      name: "John Doe",
      location: "New York, USA",
      position: "Senior Frontend Developer",
      experience: "5 years",
      appliedDate: "2024-03-15",
      aiStatus: "passed",
      aiAssessment:
        "Strong technical background with excellent problem-solving skills. Experience in React and TypeScript aligns perfectly with role requirements.",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      websiteUrl: "https://johndoe.dev",
      resumeUrl: "/resumes/john-doe.pdf",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      status: "accepted",
      technical_skills: [
        "React",
        "TypeScript",
        "Node.js",
        "GraphQL",
        "AWS",
        "Docker",
        "MongoDB",
      ],
      immediateJoiner: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "London, UK",
      position: "Full Stack Developer",
      experience: "3 years",
      appliedDate: "2024-03-14",
      aiStatus: "review_required",
      aiAssessment:
        "Good technical skills but requires manual review of specific qualifications.",
      linkedinUrl: "https://linkedin.com/in/sarahjohnson",
      resumeUrl: "/resumes/sarah-johnson.pdf",
      email: "sarah.j@example.com",
      phone: "+44 20 7123 4567",
      status: "in-review",
      technical_skills: [
        "JavaScript",
        "Python",
        "Django",
        "React",
        "PostgreSQL",
        "Redis",
        "REST APIs",
      ],
      immediateJoiner: false,
    },
    {
      id: 3,
      name: "Michael Chen",
      location: "Singapore",
      position: "Backend Developer",
      experience: "7 years",
      appliedDate: "2024-03-13",
      aiStatus: "passed",
      aiAssessment:
        "Excellent backend expertise with strong system design knowledge. Perfect match for the role.",
      linkedinUrl: "https://linkedin.com/in/michaelchen",
      websiteUrl: "https://michaelchen.dev",
      email: "m.chen@example.com",
      phone: "+65 9123 4567",
      status: "accepted",
      technical_skills: [
        "Java",
        "Spring Boot",
        "Kubernetes",
        "MySQL",
        "Redis",
        "Microservices",
        "CI/CD",
      ],
      immediateJoiner: true,
    },
    {
      id: 4,
      name: "Emma Wilson",
      location: "Toronto, Canada",
      position: "Frontend Developer",
      experience: "2 years",
      appliedDate: "2024-03-12",
      aiStatus: "rejected",
      aiAssessment:
        "Skills don't align well with the required technical stack. Limited experience in key technologies.",
      linkedinUrl: "https://linkedin.com/in/emmawilson",
      email: "emma.w@example.com",
      phone: "+1 416 555 0123",
      status: "rejected",
      technical_skills: [
        "React",
        "Vue.js",
        "CSS",
        "Sass",
        "Webpack",
        "Jest",
        "Performance Optimization",
      ],
      immediateJoiner: true,
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      location: "Madrid, Spain",
      position: "Full Stack Developer",
      experience: "4 years",
      appliedDate: "2024-03-11",
      aiStatus: "review_required",
      aiAssessment:
        "Mixed skill set with some matching requirements. Manual review needed for experience verification.",
      linkedinUrl: "https://linkedin.com/in/alexrodriguez",
      websiteUrl: "https://alexdev.es",
      resumeUrl: "/resumes/alex-rodriguez.pdf",
      email: "alex.r@example.com",
      phone: "+34 612 34 56 78",
      status: "rejected",
      technical_skills: [
        "JavaScript",
        "Angular",
        "Node.js",
        "MongoDB",
        "Express",
        "Docker",
        "AWS",
      ],
      immediateJoiner: false,
    },
    {
      id: 6,
      name: "Priya Patel",
      location: "Mumbai, India",
      position: "Senior Backend Developer",
      experience: "6 years",
      appliedDate: "2024-03-10",
      aiStatus: "passed",
      aiAssessment:
        "Strong backend development skills with excellent database expertise. Great potential for the role.",
      linkedinUrl: "https://linkedin.com/in/priyapatel",
      resumeUrl: "/resumes/priya-patel.pdf",
      email: "priya.p@example.com",
      phone: "+91 98765 43210",
      status: "rejected",
      technical_skills: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Elasticsearch",
        "System Design",
        "AWS",
      ],
      immediateJoiner: true,
    },
    {
      id: 7,
      name: "David Kim",
      location: "Seoul, South Korea",
      position: "Frontend Developer",
      experience: "3 years",
      appliedDate: "2024-03-09",
      aiStatus: "rejected",
      aiAssessment:
        "Insufficient experience level and missing critical required skills for the position.",
      websiteUrl: "https://davidkim.dev",
      email: "david.k@example.com",
      phone: "+82 10-1234-5678",
      status: "rejected",
      technical_skills: [
        "React",
        "Next.js",
        "TailwindCSS",
        "JavaScript",
        "Firebase",
        "UI/UX",
        "Responsive Design",
      ],
      immediateJoiner: false,
    },
    {
      id: 8,
      name: "Lisa Anderson",
      location: "Sydney, Australia",
      position: "Full Stack Developer",
      experience: "4 years",
      appliedDate: "2024-03-08",
      aiStatus: "review_required",
      aiAssessment:
        "Promising skill set but needs verification of project experience and technical depth.",
      linkedinUrl: "https://linkedin.com/in/lisaanderson",
      websiteUrl: "https://lisaanderson.dev",
      resumeUrl: "/resumes/lisa-anderson.pdf",
      email: "lisa.a@example.com",
      phone: "+61 2 9876 5432",
      status: "rejected",
      technical_skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Git",
        "Agile",
      ],
      immediateJoiner: true,
    },
  ];
  const [applicants, setApplicants] = useState(initialApplicants);

  const statusTabs = [
    {
      id: "accepted",
      label: "Accepted",
      count: applicants.filter((a) => a.status === "accepted").length,
      icon: CheckCircle2,
      color: "success",
      description: "Accepted candidates",
    },
    {
      id: "in-review",
      label: "In Review",
      count: applicants.filter((a) => a.status === "in-review").length,
      icon: Clock,
      color: "warning",
      description: "Applications under review",
    },
    {
      id: "rejected",
      label: "Rejected",
      count: applicants.filter((a) => a.status === "rejected").length,
      icon: XCircle,
      color: "error",
      description: "Rejected applications",
    },
  ];

  // Define the ContactInfo component inside the main component
  const ContactInfo = ({
    icon: Icon,
    value,
    label,
  }: {
    icon: LucideIcon;
    value: string;
    label: string;
  }) => {
    const [showCopied, setShowCopied] = useState(false);

    const getMaskedValue = (value: string, type: "email" | "phone") => {
      if (type === "email") {
        const [username, domain] = value.split("@");
        return `${username.charAt(0)}***@${domain}`;
      }
      return value;
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
              className={`tooltip ${contactButtonStyles.copyWrapper}`}
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

  // Define the ExternalLinks component inside the main component
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
    const links = [
      {
        url: linkedinUrl,
        icon: Linkedin,
        label: "View LinkedIn Profile",
        className: "text-[#0A66C2]",
        onClick: () => window.open(linkedinUrl, "_blank"),
      },
      {
        url: websiteUrl,
        icon: Globe,
        label: "Visit Website",
        className: "text-primary",
        onClick: () => window.open(websiteUrl, "_blank"),
      },
      {
        url: resumeUrl,
        icon: FileText,
        label: "View Resume",
        className: "text-base-content",
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          setSelectedApplicant(applicant);
          setIsModalOpen(true);
        },
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
                <div
                  key={applicant.id}
                  className="card bg-base-100 border border-base-200 hover:border-base-300 transition-colors"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">
                            {applicant.name}
                          </h3>
                          {applicant.aiStatus && (
                            <div
                              className={`badge gap-1.5 badge-${
                                getAIStatusDetails(applicant.aiStatus).color
                              }`}
                            >
                              {React.createElement(
                                getAIStatusDetails(applicant.aiStatus).Icon,
                                {
                                  className: "w-3 h-3",
                                }
                              )}
                              <span className="text-xs">
                                {getAIStatusDetails(applicant.aiStatus).label}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {applicant.position} , {applicant.location}
                          </span>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {applicant.technical_skills
                              .slice(0, 5)
                              .map((skill, index) => (
                                <span
                                  key={index}
                                  className="badge badge-ghost badge-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            {applicant.technical_skills.length > 5 && (
                              <span className="badge badge-ghost badge-sm">
                                +{applicant.technical_skills.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-2">
                          <ExternalLinks
                            applicant={applicant}
                            linkedinUrl={applicant.linkedinUrl}
                            websiteUrl={applicant.websiteUrl}
                            resumeUrl={applicant.resumeUrl}
                          />

                          <div className="dropdown dropdown-end">
                            <label
                              tabIndex={0}
                              className="btn btn-ghost btn-sm"
                            >
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
                                  <ArrowUpDown className="w-4 h-4" />
                                  Change Status
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className={contactButtonStyles.wrapper}>
                          <ContactInfo
                            icon={Mail}
                            value={applicant.email}
                            label="Email"
                          />
                          <ContactInfo
                            icon={Phone}
                            value={applicant.phone}
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
                              {applicant.aiAssessment}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
