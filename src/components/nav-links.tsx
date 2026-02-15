"use client";
import { SignedInNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 text-semibold items-center justify-center text-primary/90 hover:text-primary">
      {SignedInNavLinks.map(({ name, label, link }) => {
        const isActive = pathname === link;
        return (
          <Link
            key={name}
            href={link}
            className={cn(
              "relative py-1 transition-colors duration-300",
              isActive ? "text-primary" : "text-primary/60 hover:text-primary",
            )}
          >
            {label}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 rounded-b-lg bg-primary transition-all duration-300",
                isActive ? "w-full" : "w-0",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
