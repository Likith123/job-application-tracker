"use client";
import { SignedInNavLinks } from "@/lib/data";
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
            className={`${isActive ? "text-primary/95 hover:text-primary text-bold" : "text-primary/70 hover:text-primary/85 text-semibold"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
