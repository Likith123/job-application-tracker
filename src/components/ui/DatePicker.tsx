"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

type DatePickerProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
  disabled?: boolean;
};

export default function DatePicker({
  value,
  onChange,
  disabled = false,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate(value);
  }, [value]);

  function handleSelect(selected?: Date) {
    setDate(selected);
    onChange?.(selected);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          disabled={disabled}
          className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={date}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
