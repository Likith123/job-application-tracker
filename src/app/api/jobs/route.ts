import { JobStatus } from "@/generated/prisma/enums";
import { createJob, fetchJobs } from "@/lib/api";
import { withAuth } from "@/lib/auth/auth-helper";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req: Request, user: { id: string }) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status")?.toUpperCase() as JobStatus | null;
  const jobs = await fetchJobs(user.id, status as JobStatus);
  return NextResponse.json(jobs);
});

export const POST = withAuth(async (req: Request, user: { id: string }) => {
  const body = await req.json();
  const newJob = await createJob(user.id, body);
  return NextResponse.json(newJob);
});
