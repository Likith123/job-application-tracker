"use client";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Session = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    firstName: string;
    lastName: string;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
};

export default function UserProfile({ session }: { session: Session }) {
  const router = useRouter();
  const { firstName, lastName, name, email } = session.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
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
