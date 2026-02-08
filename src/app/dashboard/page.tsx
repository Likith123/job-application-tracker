import JobsSectionWithStatus from "@/components/JobsSectionWithStatus";
import { SignedInNavLinks } from "@/lib/data";
import { NavLinkType } from "@/lib/types";

export default function Dashboard() {
  return (
    <section className="container max-w-7xl mx-auto py-12 min-h-[calc(100vh-4rem)] flex gap-16 flex-wrap justify-center">
      <header className="text-center w-full flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold bg-linear-to-tr from-primary/60 via-primary/80 to-primary text-transparent bg-clip-text">
          Jobs
        </h1>
        <p className="text-xl font-semibold text-muted-foreground">
          Track and manage your job applications at{" "}
          <span className="text-primary/80 font-bold italic">one place.</span>
        </p>
      </header>

      <div className="flex flex-wrap gap-16 justify-center">
        {SignedInNavLinks.map((navLinkObj: NavLinkType) => (
          <JobsSectionWithStatus key={navLinkObj.status} {...navLinkObj} />
        ))}
      </div>
    </section>
  );
}
