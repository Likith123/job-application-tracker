"use client";
import JobsSectionWithStatus from "@/components/JobsSectionWithStatus";
import TableComponent from "@/components/Table";
import { SignedInNavLinks } from "@/lib/data";
import { NavLinkType } from "@/lib/types";
// import { SignedInNavLinks } from "@/lib/data";
// import JobsSectionWithStatus from "@/components/JobsSectionWithStatus";

export default function Dashboard() {
  return (
    <section className="container max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex gap-4 flex-wrap justify-center">
      <header className="mt-16 text-center w-full flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold bg-linear-to-tr from-primary/60 via-primary/80 to-primary text-transparent bg-clip-text">
          Jobs
        </h1>
        <p className="text-xl font-semibold text-muted-foreground">
          Track and manage your job applications at <span className="text-primary/80 font-bold italic">one place.</span>
        </p>
      </header>

      {/* Criteria */}
      {/* {SignedInNavLinks.map((navLinkObj: NavLinkType) => (
        <JobsSectionWithStatus key={navLinkObj.name} {...navLinkObj} />
      ))} */}
      <TableComponent />
    </section>
  );
}
