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
  popup,
  id,
  disabled,
}: {
  state: string;
  stateFn: (value: string) => void;
  label: string;
  options: { label: string; value: string }[];
  popup: boolean;
  id: string;
  disabled: boolean;
}) {
  return (
    <Select
      value={state}
      onValueChange={(value) => {
        stateFn(value);
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className={`p-2 border rounded-md w-full${popup ? "" : " max-w-60"}`}
        id={id}
        name={id}
      >
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
