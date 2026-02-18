import { Button } from "./ui/button";

export default function FormButton({
  text,
  loadingText,
  isLoading,
}: {
  text: string;
  loadingText: string;
  isLoading: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-primary/80 text-foreground rounded-md hover:bg-primary/90 hover:cursor-pointer"
    >
      {isLoading ? loadingText : text}
    </Button>
  );
}
