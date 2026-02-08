import { Edit, Eye, Plus, Trash } from "lucide-react";
import { JobDataType } from "./types";

const SignedInNavLinks = [
  {
    status: "saved",
    label: "Saved Jobs",
  },
  {
    status: "applied",
    label: "Applied Jobs",
  },
  {
    status: "interview",
    label: "Interviews",
  },
  {
    status: "success",
    label: "Offers",
  },
  {
    status: "rejected",
    label: "Rejected Applications",
  },
];

const emptyJob: JobDataType = {
  id: "",
  company: "",
  role: "",
  jobType: "FULL_TIME",
  mode: "REMOTE",
  status: "SAVED",
  location: "",
  source: "",
  jobLink: "",
  notes: "",
  appliedAt: "",
  createdAt: "",
  updatedAt: "",
  userId: "",
};

const statusOptions = [
  { label: "All", value: "ALL" },
  { label: "Saved", value: "SAVED" },
  { label: "Applied", value: "APPLIED" },
  { label: "Interview", value: "INTERVIEW" },
  { label: "Offer", value: "SUCCESS" },
  { label: "Rejected", value: "REJECTED" },
];

const jobTypeOptions = [
  { label: "All", value: "ALL" },
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Intern", value: "INTERN" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Freelance", value: "FREELANCE" },
];

const jobModeOptions = [
  { label: "All", value: "ALL" },
  { label: "Onsite", value: "ON_SITE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "Remote", value: "REMOTE" },
];

const actionConfig = {
  add: {
    label: "Add Job Application",
    icon: Plus,
    variant: "default" as const,
    showLabel: true,
    className: "",
    description:
      "Add a new job you've applied to or plan to apply for. Track its status, type, and important details in one place.",
    buttonText: ["Adding...", "Add Job"],
  },
  edit: {
    label: "Edit Job Application",
    icon: Edit,
    variant: "ghost" as const,
    showLabel: false,
    className: "",
    description:
      "Update job details to keep your application progress accurate",
    buttonText: ["Updating...", "Update Job"],
  },
  delete: {
    label: "Delete Job Application",
    icon: Trash,
    variant: "ghost" as const,
    showLabel: false,
    className: "text-destructive/60 hover:text-destructive",
    description:
      "Are you sure you want to delete this job? This action cannot be undone.",
    buttonText: ["Deleting...", "Delete Job"],
  },
  view: {
    label: "View Job Application",
    icon: Eye,
    variant: "ghost" as const,
    showLabel: false,
    className: "muted",
    description: "View your job aplication.",
    buttonText: ["", ""],
  },
};

export {
  actionConfig,
  emptyJob,
  jobModeOptions,
  jobTypeOptions,
  SignedInNavLinks,
  statusOptions,
};
