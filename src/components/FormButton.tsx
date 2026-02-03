"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary"
    >
      {pending ? "Submitting..." : text}
    </Button>
  );
}
