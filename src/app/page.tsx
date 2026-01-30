import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container max-w-7xl min-h-[calc(100vh-4rem)] mx-auto flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold">
          Welcome to the{" "}
          <span className="text-primary italic">Job Application Tracker</span>
        </h1>
        <p className="text-lg text-foreground/75">
          A better way to track your job applications at a single place
          efficiently and stay organized.
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-16 flex flex-col gap-4 items-center">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="bg-primary/90 text-foreground rounded-md hover:bg-primary"
          >
            Start for free <ArrowRight className="ml-2" />
          </Button>
        </Link>
        <p className="">Free forever. No payment required.</p>
      </div>
    </section>
  );
}
