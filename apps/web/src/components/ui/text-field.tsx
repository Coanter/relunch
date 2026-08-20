import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: ReactNode;
};

export function TextField({ label, icon, id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          {icon}
        </span>
        <input
          id={id}
          className="w-full rounded-lg border border-line bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
          {...props}
        />
      </div>
    </div>
  );
}