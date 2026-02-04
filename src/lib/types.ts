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
  company: string;
  role: string;
  status: string;
  jobType: string;
  mode: string;
  location?: string;
  source?: string;
  appliedAt?: string;   // ISO string for UI
  createdAt: string;    // ISO string
};