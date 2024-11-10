import JobForm from "@/components/JobForm";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Create Job</h1>
              <p className="text-base-content/60 text-sm mt-1">
                Create a new job posting
              </p>
            </div>
            <Link href="/jobs" className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Back to My Jobs
            </Link>
          </div>
        </div>

        <JobForm />
      </div>
    </div>
  );
}
