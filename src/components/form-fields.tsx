import { FormFieldProps } from "@/lib/types";
import { Controller } from "react-hook-form";
import SelectComponent from "./select";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function TextInputField({
  name,
  label,
  placeholder,
  isDelete,
  register,
}: FormFieldProps) {
  return (
    <>
      <Field>
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          {...(register ? register(name) : {})}
          disabled={isDelete}
          placeholder={placeholder}
          required
        />
      </Field>
    </>
  );
}

function SelectField({
  name,
  label,
  control,
  isDelete,
  options,
}: FormFieldProps) {
  return (
    <>
      <Field>
        <Label htmlFor={name}>{label}</Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <SelectComponent
              state={field.value as string}
              stateFn={field.onChange}
              label={label}
              options={options ?? []}
              popup={true}
              disabled={isDelete}
              id={name}
            />
          )}
        />
      </Field>
    </>
  );
}

export { SelectField, TextInputField };
