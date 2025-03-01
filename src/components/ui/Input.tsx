import { Field, Input, Label, InputProps as inputP } from "@headlessui/react";
import clsx from "clsx";

export interface InputProps extends inputP {
  label?: string;
  // className?: string;
  inputClassName?: string;
}

export default function InputComponent({
  label,
  // className,
  inputClassName,
  ...inputProps
}: InputProps) {
  return (
    // <div className={clsx("w-full max-w-sm px-4", className)}>
    <Field>
      {label && <Label className="text-sm font-medium text-gray-800">{label}</Label>}
      <Input
        className={clsx(
          "mt-1 block w-full rounded-md border-gray-300 bg-white py-1 px-2 text-sm text-gray-800",
          inputClassName,
          "focus:outline-none focus:ring-1 focus:ring-gray-400"
        )}
        {...inputProps}
      />
    </Field>
    // </div>
  );
}
