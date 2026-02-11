"use client";

import { useEffect, useState } from "react";

export default function SearchBar({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}