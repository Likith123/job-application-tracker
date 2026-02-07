import prisma from "@/db/prisma";
import { JobStatus, JobType } from "@/generated/prisma/enums";
import { withAuth } from "@/lib/auth/auth-helper";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req: Request, user: { id: string }) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status")?.toUpperCase() as JobStatus | null;
  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
      status: status ?? undefined,
    },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(jobs);
});

export const POST = withAuth(async (req: Request, user: { id: string }) => {
  const body = await req.json();
  const newJob= await prisma.job.create({
    data: {
      company: body.company,
      role: body.role,
      jobLink: body.jobLink,
      jobType: body.jobType as JobType,
      status: body.status as JobStatus,
      mode: body.mode,
      location: body.location,
      source: body.source,
      notes: body.notes,
      appliedAt: body.appliedAt ? new Date(body.appliedAt) : null,
      userId: user.id,
    },
  });
  return NextResponse.json(newJob);
});
