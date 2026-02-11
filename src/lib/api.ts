import prisma from "@/db/prisma";
import { JobMode, JobStatus, JobType } from "@/generated/prisma/enums";
import { JobDataType } from "@/lib/types";

export async function fetchJobs(
  userId: string | undefined,
  status?: JobStatus,
): Promise<JobDataType[]> {
  return await prisma.job.findMany({
    where: {
      userId: userId,
      status: status?.toUpperCase() as JobStatus,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createJob(userId: string, job: JobDataType) {
  return await prisma.job.create({
    data: {
      company: job.company,
      role: job.role,
      jobLink: job.jobLink,
      jobType: job.jobType as JobType,
      status: job.status as JobStatus,
      mode: job.mode,
      location: job.location,
      source: job.source,
      notes: job.notes,
      appliedAt: job.appliedAt ? new Date(job.appliedAt) : null,
      userId: userId,
    },
  });
}

export async function updateJob(id: string, userId: string, job: JobDataType) {
  return await prisma.job.update({
    where: { id },
    data: {
      company: job.company,
      role: job.role,
      jobType: job.jobType as JobType,
      mode: job.mode as JobMode,
      status: job.status as JobStatus,
      location: job.location,
      source: job.source,
      jobLink: job.jobLink,
      notes: job.notes,
      appliedAt: job.appliedAt ? new Date(job.appliedAt) : null,
    },
  });
}

export async function deleteJob(id: string) {
  return await prisma.job.delete({
    where: { id },
  });
}
