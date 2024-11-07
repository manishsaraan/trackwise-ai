import { getAllJobs } from "@/app/actions";
import JobListingsClient from "./JobListingsClient";

async function JobListingsDashboard() {
  const jobs = await getAllJobs();
  console.log(jobs);
  return <JobListingsClient initialJobs={jobs.jobs} />;
}

export default JobListingsDashboard;
