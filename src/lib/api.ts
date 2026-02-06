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

export async function updateJob(id: string, data: JobDataType) {
  const url = `/api/jobs/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to update the job with id: ${id}`);
  }
  return res.json();
}

export async function deleteJob(id: string) {
  const url = `/api/jobs/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete the job with id: ${id}`);
  }
  return res.json();
}
