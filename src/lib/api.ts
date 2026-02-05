import { JobDataType } from "@/lib/types";

export async function fetchJobs(status?: string): Promise<JobDataType[]> {
  const url =
    status && status !== "ALL" && status !== "all"
      ? `/api/jobs?status=${status}`
      : "/api/jobs";
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  console.log("fetchJobs end", status);
  return res.json();
}

export async function createJob(job: JobDataType) {
  const url = "api/jobs";
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  if (!res.ok) {
    throw new Error("Failed to add a job");
  }
  return res.json();
}
