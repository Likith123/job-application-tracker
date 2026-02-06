import prisma from "@/db/prisma";
import { JobMode, JobStatus, JobType } from "@/generated/prisma/enums";
import { withAuth } from "@/lib/auth/auth-helper";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (req, user, context) => {
  const { id } = await (context?.params as Promise<{ id: string }>);
  if (!id) {
    return NextResponse.json({ error: "Job id is required" }, { status: 400 });
  }

  const body = await req.json();
  const existingJob = await prisma.job.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existingJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const updatedJob = await prisma.job.update({
    where: { id },
    data: {
      company: body.company,
      role: body.role,
      jobType: body.jobType as JobType,
      mode: body.mode as JobMode,
      status: body.status as JobStatus,
      location: body.location,
      source: body.source,
      jobLink: body.jobLink,
      notes: body.notes,
      appliedAt: body.appliedAt ? new Date(body.appliedAt) : null,
    },
  });
  return NextResponse.json(updatedJob);
});

export const DELETE = withAuth(async (_req, user, context) => {
  const { id } = await (context?.params as Promise<{ id: string }>);
  if (!id) {
    return NextResponse.json({ error: "Job id is required" }, { status: 400 });
  }

  const existingJob = await prisma.job.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!existingJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  await prisma.job.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
});
