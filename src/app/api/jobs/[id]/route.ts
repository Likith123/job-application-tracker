import prisma from "@/db/prisma";
import { deleteJob, updateJob } from "@/lib/api";
import { withAuth } from "@/lib/auth/auth-helper";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (req, user, context) => {
  const { id } = await (context?.params as Promise<{ id: string }>);
  if (!id) {
    return NextResponse.json({ error: "Job id is required" }, { status: 400 });
  }
  const body = await req.json();
  const updatedJob = await updateJob(id, user.id, body);
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
  await deleteJob(id);
  return NextResponse.json({ success: true });
});
