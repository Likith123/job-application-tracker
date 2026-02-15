import { getSession } from "@/lib/auth/auth";
import { emptyJob } from "@/lib/data";
import Link from "next/link";
import ModalForm from "./modal";
import NavLinks from "./nav-links";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="sticky top-0 h-16 flex justify-between items-center px-8 md:px-16 py-4 border-b border-primary/20 z-50 blur-backdrop-filter backdrop-filter backdrop-blur-lg">
      <div className="text-2xl font-bold text-primary">
        <Link href="/">Tracker</Link>
      </div>
      <div className="flex items-center justify-center gap-6">
        {session?.user ? (
          <div className="flex items-center justify-center gap-6">
            <NavLinks />
            <ModalForm mode="add" job={emptyJob} />
            <UserProfile session={session} />
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-semibold text-primary/90 hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-1 bg-primary/90 text-primary-foreground text-semibold text-center rounded-md hover:bg-primary"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
