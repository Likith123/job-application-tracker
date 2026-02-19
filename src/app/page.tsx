import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container max-w-7xl h-[calc(100dvh-4rem)] mx-auto flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mt-16 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground/75 tracking-wide">
          Apply Anywhere. <span className="block md:inline bg-linear-to-tr from-primary/50 via-primary/75 to-primary text-transparent bg-clip-text">Track Here.</span>
        </h1>
        <p className="text-lg text-foreground/75">
          Organize applications, track their stages, celebrate offers, and analyze rejection patterns at one place.
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col gap-4 items-center">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="group bg-primary/90 text-foreground rounded-md hover:bg-primary"
          >
            Start for free{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
        <p className="">Free forever. No payment required.</p>
      </div>
      <div className="max-w-7xl mx-8 mt-16 rounded-lg overflow-hidden shadow-[-1px_-15px_80px_1px_rgba(34,197,94,0.2)] hover:scale-102 transition-transform duration-300">
        <Image
          src="/og-image.png"
          alt="Hero Image"
          width={1000}
          height={600}
          priority
        />
      </div>
    </section>
  );
}
