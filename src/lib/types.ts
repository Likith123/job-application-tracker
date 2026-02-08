import { JobMode, JobStatus, JobType } from "@/generated/prisma/enums";
import { Control, UseFormRegister } from "react-hook-form";

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
  status: string;
  label: string;
  color: string;
};

export type JobDataType = {
  id: string;
  company: string;
  role: string;
  jobType: JobType;
  mode: JobMode;
  status: JobStatus;
  location?: string | null;
  source?: string | null;
  jobLink: string;
  notes?: string | null;
  appliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type FormFieldProps = {
  name: keyof JobDataType;
  label: string;
  placeholder?: string;
  register?: UseFormRegister<JobDataType>;
  isDelete: boolean;
  control?: Control<JobDataType>;
  options?: {
    label: string;
    value: string;
  }[];
};
