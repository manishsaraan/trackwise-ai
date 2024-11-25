import {
  Users,
  MapPin,
  Briefcase,
  Monitor,
  Eye,
  Calendar,
  XCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

import JobActions from "./JobActions";

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
  status: string;
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

export default function JobListingsClient({
  initialJobs,
}: {
  initialJobs: Job[];
}) {
  return (
    <div className="space-y-4">
      {initialJobs.map((job) => (
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
                    <div className="badge badge-primary badge-sm">Priority</div>
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
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-3 px-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{job.totalApplicants}</span>
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

                <JobActions jobId={job.id} jobSlug={job.id.toString()} status={job.status} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
