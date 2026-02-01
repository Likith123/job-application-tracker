import { SignedInNavLinks } from "@/lib/data";
import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="flex gap-6 text-semibold items-center justify-center text-primary/90 hover:text-primary">
      {SignedInNavLinks.map((link) => (
        <Link key={link.name} href={link.href} className="text-primary/80 hover:text-primary">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
