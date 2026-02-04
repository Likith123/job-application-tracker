import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SelectComponent({
  state,
  stateFn,
  label,
  options,
}: {
  state: string;
  stateFn: (value: string) => void;
  label: string;
  options: { label: string; value: string }[];
}) {
  return (
    <Select value={state} onValueChange={stateFn}>
      <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full max-w-60">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
