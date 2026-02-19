import JobsSectionWithStatus from "@/components/jobs-section-with-status";
import { getSession } from "@/lib/auth/auth";
import { JobsWithStatusObj } from "@/lib/data";
import { NavLinkType } from "@/lib/types";

export default async function Dashboard() {
  const session = await getSession();
  return (
    <section className="container max-w-7xl mx-auto py-12 min-h-[calc(100vh-4rem)] flex gap-16 flex-wrap justify-center">
      <header className="text-center w-full flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold bg-linear-to-tr from-primary/50 via-primary/75 to-primary text-transparent bg-clip-text">
          Welcome, {session?.user?.firstName},
        </h1>
        <p className="text-lg md:text-xl font-semibold text-muted-foreground">
          Track and manage your job applications
          <br className="md:hidden"/> at{" "}
          <span className="text-primary/80 font-bold italic">one place.</span>
        </p>
      </header>

      <div className="flex flex-wrap gap-8 md:gap-16 justify-center">
        {JobsWithStatusObj.map((obj: NavLinkType) => {
          return (
            <JobsSectionWithStatus
              key={obj.status}
              obj={obj}
              userId={session?.user.id}
            />
          );
        })}
      </div>
    </section>
  );
}
