"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormButton({
  text,
  loadingText,
}: {
  text: string;
  loadingText: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary/80 text-primary-foreground rounded-md hover:bg-primary/90 hover:cursor-pointer"
    >
      {pending ? loadingText : text}
    </Button>
  );
}
