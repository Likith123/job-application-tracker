import { JobDataType } from "@/lib/types";

export async function fetchJobsClient(status?: string) {
  const url = status !== "all" ? `/api/jobs?status=${status}` : "/api/jobs";
  const res = await fetch(url);
  return res.json();
}

export async function createJobClient(job: JobDataType) {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function updateJobClient(id: string, job: JobDataType) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function deleteJobClient(id: string) {
  const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
  return res.json();
}
