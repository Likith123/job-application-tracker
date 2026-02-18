"use client";
import { signOut } from "@/lib/auth/auth-client";
import { SessionType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserProfile({ session }: { session: SessionType }) {
  const router = useRouter();
  const { firstName, lastName, name, email } = session?.user ?? {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 bg-primary text-foreground">
          <AvatarFallback className="font-bold">
            {firstName?.[0]?.toUpperCase() ?? ""}
            {lastName?.[0]?.toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
          <DropdownMenuItem
            className="text-left hover:text-destructive/75 hover:bg-destructive/5 mt-4 data-highlighted:bg-destructive/10 data-highlighted:text-destructive"
            onClick={async () => {
              const result = await signOut();
              if (result.data) {
                router.refresh();
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
  );
}
