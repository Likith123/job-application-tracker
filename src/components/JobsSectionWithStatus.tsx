import { NavLinkType } from "@/app/dashboard/page";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JobsSectionWithStatus(navLinkObj: NavLinkType) {
  const { name, href, label, color } = navLinkObj;
  return (
    <div className="w-72 h-100 flex items-center justify-start border border-gray-200 rounded-lg flex-col overflow-hidden shadow-sm">
      {/* heading with link */}
      <div
        className={`w-full px-4 py-6 flex items-center justify-between ${color}`}
      >
        <span>{label}</span>
        <span>
          <Link
            href={href}
            className={`${color} group underline flex items-center justify-center gap-2`}
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </span>
      </div>

      {/* Top 5 Jobs of respective status */}
      <div className="w-full">{name}</div>
    </div>
  );
}
