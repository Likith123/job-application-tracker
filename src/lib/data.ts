import { Edit, Plus, Trash } from "lucide-react";
import { JobDataType } from "./types";

const SignedInNavLinks = [
  {
    name: "wishlistJobs",
    href: "/dashboard/wishlist-jobs",
    label: "Wish List Jobs",
    color: "bg-yellow-400 text-white",
  },
  {
    name: "appliedJobs",
    href: "/dashboard/applied-jobs",
    label: "Applied Jobs",
    color: "bg-blue-400 text-white",
  },
  {
    name: "interviews",
    href: "/dashboard/interviews",
    label: "Interviews",
    color: "bg-purple-400 text-white",
  },
  {
    name: "successfulOffers",
    href: "/dashboard/successful-offers",
    label: "Successful Offers",
    color: "bg-green-400 text-white",
  },
  {
    name: "rejectedApplications",
    href: "/dashboard/rejected-applications",
    label: "Rejected Applications",
    color: "bg-red-400 text-white",
  },
];

const data: JobDataType[] = [
  {
    id: "job_1",
    company: "Google",
    role: "Frontend Engineer",
    status: "APPLIED",
    jobType: "FULL_TIME",
    mode: "REMOTE",
    location: "Bangalore",
    source: "LinkedIn",
    appliedAt: "2026-01-12",
    createdAt: "2026-01-10",
    jobLink: "",
    updatedAt: "",
    userId: "",
  },
  {
    id: "job_2",
    company: "Amazon",
    role: "Software Engineer",
    status: "SAVED",
    jobType: "FULL_TIME",
    mode: "HYBRID",
    location: "Hyderabad",
    source: "Careers Page",
    createdAt: "2026-01-14",
    jobLink: "",
    updatedAt: "",
    userId: "",
  },
  {
    id: "job_3",
    company: "Startup XYZ",
    role: "React Developer",
    status: "REJECTED",
    jobType: "CONTRACT",
    mode: "REMOTE",
    source: "Referral",
    appliedAt: "2026-01-05",
    createdAt: "2026-01-03",
    jobLink: "",
    updatedAt: "",
    userId: "",
  },
  {
    id: "job_4",
    company: "Microsoft",
    role: "UI Engineer",
    status: "SUCCESS",
    jobType: "FULL_TIME",
    mode: "ON_SITE",
    location: "Bangalore",
    source: "LinkedIn",
    appliedAt: "2025-12-20",
    createdAt: "2025-12-18",
    jobLink: "",
    updatedAt: "",
    userId: "",
  },
];

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
};

export {
  actionConfig,
  data,
  jobModeOptions,
  jobTypeOptions,
  SignedInNavLinks,
  statusOptions,
};
