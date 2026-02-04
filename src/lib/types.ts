import { JobMode, JobStatus, JobType } from "@/generated/prisma/enums";

export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type NavLinkType = {
  name: string;
  href: string;
  label: string;
  color: string;
};

export type JobDataType = {
  id: string;
  role: string;
  company: string;
  mode: JobMode;
  location?: string | null;
  source?: string | null;
  jobLink: string;
  jobType: JobType;
  status: JobStatus;
  notes?: string | null;
  appliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
