import { SignedInNavLinks } from "@/lib/data";
import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="flex gap-6 text-semibold items-center justify-center text-primary/90 hover:text-primary">
      {SignedInNavLinks.map(({status, label}) => (
        <Link key={status} href={`/dashboard/${status}`} className="text-primary/80 hover:text-primary">
          {label}
        </Link>
      ))}
    </div>
  );
}
