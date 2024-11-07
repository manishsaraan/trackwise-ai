"use client";

import React, { useState } from "react";
import {
  UserCheck,
  UserX,
  Clock,
  Brain,
  ChevronDown,
  Eye,
  Mail,
  Phone,
  Calendar,
  Filter,
  Search,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Globe,
  FileText,
  ExternalLink,
  Clock4,
} from "lucide-react";

const ApplicantCard = ({ applicant, onStatusChange }) => {
  const statuses = [
    { id: "shortlisted", label: "Shortlist Candidate", color: "success" },
    { id: "interview", label: "Schedule Interview", color: "primary" },
    { id: "rejected", label: "Reject Application", color: "error" },
    { id: "on_hold", label: "Put On Hold", color: "warning" },
  ];

  return (
    <div className="card bg-base-100 border border-base-200 hover:border-base-300 transition-all">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {applicant.personal_information.name}
              {applicant.technical_skills.length > 5 && (
                <span className="badge badge-primary badge-sm">
                  Strong Tech Stack
                </span>
              )}
              {applicant.work_experience.length > 3 && (
                <span className="badge badge-success badge-sm">
                  Experienced
                </span>
              )}
            </h3>
            <p className="text-base-content/70 text-sm">
              {applicant.work_experience[0]?.job_title || "No current position"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`badge ${
                applicant.ai_status === "ACCEPTED"
                  ? "badge-success"
                  : applicant.ai_status === "REJECTED"
                  ? "badge-error"
                  : "badge-warning"
              } gap-1`}
            >
              <Brain className="w-3 h-3" />
              {applicant.ai_status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-base-content/60" />
                <span>
                  {applicant.personal_information.contact_information.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-base-content/60" />
                <span>
                  {
                    applicant.personal_information.contact_information
                      .phone_number
                  }
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-base-content/60" />
                <span>
                  {applicant.location_and_relocation.current_location}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-1">
                {applicant.technical_skills.slice(0, 5).map((skill, index) => (
                  <span key={index} className="badge badge-ghost badge-sm">
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

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                Experience & Education
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-base-content/60" />
                  <span>
                    {applicant.work_experience.length} years total experience
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-base-content/60" />
                  <span>
                    {applicant.education[0]?.degree} in{" "}
                    {applicant.education[0]?.field_of_study}
                  </span>
                </div>
                {applicant.certifications.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-base-content/60" />
                    <span>
                      {applicant.certifications.length} certifications
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-base-content/60" />
                  <span>Notice: {applicant.availability.notice_period}</span>
                </div>
                {applicant.location_and_relocation.willingness_to_relocate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-base-content/60" />
                    <span>Open to relocation</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-200">
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm gap-2">
              <FileText className="w-4 h-4" />
              View Resume
            </button>
            {applicant.personal_information.contact_information
              .linkedin_profile && (
              <a
                href={
                  applicant.personal_information.contact_information
                    .linkedin_profile
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-primary btn-sm">
                Change Status
                <ChevronDown className="w-4 h-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
              >
                {statuses.map((status) => (
                  <li key={status.id}>
                    <a
                      className={`text-${status.color}`}
                      onClick={() => onStatusChange(applicant.id, status.id)}
                    >
                      {status.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      personal_information: {
        name: "John Doe",
        contact_information: {
          email: "john@example.com",
          phone_number: "+1 234 567 890",
          linkedin_profile: "https://linkedin.com/in/johndoe",
        },
      },
      technical_skills: [
        "React",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "MongoDB",
      ],
      work_experience: [
        {
          job_title: "Senior Developer",
          company_name: "Tech Corp",
          years: 4,
        },
      ],
      education: [
        {
          degree: "Bachelor's",
          field_of_study: "Computer Science",
        },
      ],
      certifications: [
        {
          certification_name: "AWS Solutions Architect",
        },
      ],
      location_and_relocation: {
        current_location: "New York, NY",
        willingness_to_relocate: true,
      },
      availability: {
        notice_period: "30 days",
      },
      ai_status: "ACCEPTED",
    },
  ]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by name, skills, or location..."
              className="input input-bordered w-full pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="select select-bordered w-40">
              <option>All Statuses</option>
              <option>AI Approved</option>
              <option>Needs Review</option>
              <option>Not Qualified</option>
            </select>
            <select className="select select-bordered w-40">
              <option>Experience Level</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>5+ years</option>
            </select>
            <button className="btn btn-outline gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button className="btn btn-sm btn-ghost gap-1">
            <Award className="w-4 h-4" />
            Certified
          </button>
          <button className="btn btn-sm btn-ghost gap-1">
            <Globe className="w-4 h-4" />
            Can Relocate
          </button>
          <button className="btn btn-sm btn-ghost gap-1">
            <Clock className="w-4 h-4" />
            Immediate Joiners
          </button>
        </div>

        <div className="space-y-4">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              onStatusChange={(id, status) => {
                console.log(`Changing status for ${id} to ${status}`);
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-base-content/60">
            Showing {applicants.length} applicants
          </span>
          <div className="join">
            <button className="join-item btn btn-sm">«</button>
            <button className="join-item btn btn-sm btn-active">1</button>
            <button className="join-item btn btn-sm">2</button>
            <button className="join-item btn btn-sm">3</button>
            <button className="join-item btn btn-sm">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantList;
