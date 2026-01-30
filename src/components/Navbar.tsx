"use client";
import { signOut, useSession } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="sticky top-0 h-16 flex justify-between items-center px-8 md:px-16 py-4 border-b border-gray-700">
      <div className="text-2xl font-bold text-blue-500">
        <Link href="/">Tracker</Link>
      </div>
      <div className="flex items-center justify-center gap-6">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-8 h-8 bg-white text-black">
                <AvatarFallback className="font-bold">
                  {session.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
                <DropdownMenuItem
                  className="text-left hover:text-destructive/75 hover:bg-destructive/5 mt-4 data-highlighted:bg-destructive/10 data-highlighted:text-destructive"
                  onClick={async () => {
                    const result = await signOut();
                    if (result.data) {
                      router.push("/sign-in");
                    } else {
                      alert("Sign out failed");
                    }
                  }}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/sign-in" className="text-blue-400 hover:text-blue-500">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-1 bg-blue-500 text-white rounded-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
