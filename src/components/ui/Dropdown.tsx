import { SelectHTMLAttributes } from "react";
import { Description, Field, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  description?: string;
  options: { value: string; label: string }[];
}

export default function Dropdown({
  label,
  description,
  className,
  options,
  ...props
}: DropdownProps) {
  return (
    <Field className={className}>
      <Label className="text-sm/6 font-medium text-gray-900">{label}</Label>
      {description && <Description className="text-sm/6 text-gray-700">{description}</Description>}
      <div className="relative">
        <Select
          {...props}
          className={clsx(
            "mt-3 block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-gray-900",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-400",
            "*:text-black"
          )}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-gray-600"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
}
