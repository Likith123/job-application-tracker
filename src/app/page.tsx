import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container max-w-7xl h-[calc(100vh-4rem)] mx-auto flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mt-16 space-y-6">
        <h1 className="text-4xl font-bold">
          Welcome to the{" "}
          <span className="text-primary italic">Job Application Tracker</span>
        </h1>
        <p className="text-lg text-foreground/75">
          A better way to track your job applications at a single place
          efficiently and stay organized.
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col gap-4 items-center">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="group bg-primary/90 text-primary-foreground rounded-md hover:bg-primary"
          >
            Start for free{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
        <p className="">Free forever. No payment required.</p>
      </div>
      <div className="max-w-7xl mx-auto mt-16 rounded-lg overflow-hidden shadow-[-1px_-15px_80px_1px_rgba(34,197,94,0.2)] hover:scale-102 transition-transform duration-300">
        <Image
          src="/job-application-hero.png"
          alt="Hero Image"
          width={1000}
          height={80}
          priority
        />
      </div>
    </section>
  );
}
