import prisma from "@/db/prisma";
import { JobStatus, JobType } from "@/generated/prisma/enums";
import { getSession } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as JobStatus | null;
  const data = await prisma.job.findMany({
    where: {
      userId: session.user.id,
      status: status ?? undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newJob = await prisma.job.create({
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
      userId: session.user.id,
    },
  });
  return NextResponse.json(newJob, { status: 200 });
}
