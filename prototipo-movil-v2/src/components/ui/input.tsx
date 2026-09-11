import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg bg-surface-2 px-3.5 text-[15px] text-fg placeholder:text-subtle shadow-[0_0_0_1px_rgba(244,244,245,0.1)] outline-none transition-[box-shadow] duration-150 focus:shadow-[0_0_0_2px_rgba(255,90,31,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg bg-surface-2 px-3.5 py-3 text-[15px] text-fg placeholder:text-subtle shadow-[0_0_0_1px_rgba(244,244,245,0.1)] outline-none transition-[box-shadow] duration-150 focus:shadow-[0_0_0_2px_rgba(255,90,31,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-lg bg-surface-2 px-3.5 pr-9 text-[15px] text-fg shadow-[0_0_0_1px_rgba(244,244,245,0.1)] outline-none transition-[box-shadow] duration-150 focus:shadow-[0_0_0_2px_rgba(255,90,31,0.55)]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
    </div>
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("mb-1.5 block text-xs font-medium tracking-wide text-muted", className)} {...props} />
  );
}
