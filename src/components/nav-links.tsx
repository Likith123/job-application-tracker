"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6 text-semibold items-center justify-center text-primary/90 hover:text-primary">
      <Link
        href={"/dashboard"}
        className={cn(
          "hidden md:inline relative py-1 transition-colors duration-300",
          pathname === "/dashboard"
            ? "text-primary"
            : "text-primary/60 hover:text-primary",
        )}
      >
        Dashboard
        <span
          className={cn(
            "absolute bottom-0 left-0 h-0.5 rounded-b-lg bg-primary transition-all duration-300",
            pathname === "/dashboard" ? "w-full" : "w-0",
          )}
        />
      </Link>
      <Link
        href={"/jobs"}
        className={cn(
          "relative py-1 transition-colors duration-300",
          pathname === "/jobs"
            ? "text-primary"
            : "text-primary/60 hover:text-primary",
        )}
      >
        All Jobs
        <span
          className={cn(
            "absolute bottom-0 left-0 h-0.5 rounded-b-lg bg-primary transition-all duration-300",
            pathname === "/jobs" ? "w-full" : "w-0",
          )}
        />
      </Link>
    </div>
  );
}
