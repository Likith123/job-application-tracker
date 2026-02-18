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
  appliedAt?: Date | string | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
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

export type SessionType = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    firstName: string;
    lastName: string;
  };
} | null;

export type ResType = {
  success: boolean;
  msg: string;
};
