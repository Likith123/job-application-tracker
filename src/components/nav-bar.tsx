"use client";
import { useRefresh } from "@/context/refresh-context";
import { emptyJob } from "@/lib/data";
import { SessionType } from "@/lib/types";
import Link from "next/link";
import ModalForm from "./modal-form";
import NavLinks from "./nav-links";
import UserProfile from "./user-profile";

export default function Navbar({ session }: { session: SessionType }) {
  const { refresh } = useRefresh();
  return (
    <nav className="sticky top-0 h-16 flex justify-between items-center p-4 md:px-16 border-b border-primary/20 z-50 blur-backdrop-filter backdrop-filter backdrop-blur-lg">
      <div className="text-xl md:text-2xl font-bold text-primary">
        <Link href="/" className="tracking-wide leading-2">
          JoAT.
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {session?.user ? (
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <NavLinks />
            <ModalForm mode="add" job={emptyJob} refresh={refresh} />
            <UserProfile session={session} />
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-sm md:text-base font-semibold text-primary/90 hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-2 md:px-4 py-1.5 bg-primary/90 text-foreground text-sm md:text-base font-semibold text-center rounded-md hover:bg-primary transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
