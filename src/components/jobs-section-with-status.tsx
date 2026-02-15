import { JobStatus } from "@/generated/prisma/enums";
import { fetchJobs } from "@/lib/api";
import { NavLinkType } from "@/lib/types";
import { ArrowRight, MoreVertical } from "lucide-react";
import Link from "next/link";
import ModalForm from "./modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function JobsSectionWithStatus({
  obj,
  userId,
}: {
  obj: NavLinkType;
  userId: string | undefined;
}) {
  const { status, label } = obj;
  let jobs = await fetchJobs(userId, status.toLocaleLowerCase() as JobStatus);
  jobs = jobs.slice(0, 5);

  return (
    <div className="w-80 h-100 flex items-center justify-start border-2 border-primary/5 bg-primary/2 rounded-lg flex-col overflow-hidden shadow-sm hover:scale-102 transition-transform duration-200">
      <div className="w-full px-4 py-6 flex items-center justify-between bg-linear-to-b from-primary/60 to-primary/70">
        <span className="font-bold">{label}</span>
        <span>
          <Link
            href={`/jobs/${status}`}
            className={`text-foreground group underline flex items-center justify-center gap-2`}
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </span>
      </div>
      {jobs.length == 0 ? (
        <div className="w-full m-auto flex items-center justify-center">
          No {label} found
        </div>
      ) : (
        <div className="w-full divide-y bg-primary/3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-muted/40 transition"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{job.role}</span>
                <span className="text-xs text-muted-foreground">
                  {job.company}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {job.jobType.replace("_", " ").toLowerCase()}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded-md hover:bg-muted">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="flex gap-1 p-1">
                  <span>
                    <ModalForm mode="view" job={job} />
                  </span>
                  <span>
                    <ModalForm mode="edit" job={job} />
                  </span>
                  <span>
                    <ModalForm mode="delete" job={job} />
                  </span>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
