import JobsSectionWithStatus from "@/components/JobsSectionWithStatus";
import { SignedInNavLinks } from "@/lib/data";

export type NavLinkType = {
  name: string;
  href: string;
  label: string;
  color: string;
};

export default function Dashboard() {
  return (
    <section className="container max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex gap-20 flex-wrap items-center justify-center">
      {SignedInNavLinks.map((navLinkObj: NavLinkType) => (
        <JobsSectionWithStatus key={navLinkObj.name} {...navLinkObj} />
      ))}
    </section>
  );
}
