"use client";

import { useRef, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  icon?: LucideIcon;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  fullWidth?: boolean;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  fullWidth = false,
}: SegmentedControlProps<T>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Radio group keyboard pattern: arrows move + select, Home/End jump to the ends
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const last = options.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;

    e.preventDefault();
    onChange(options[next].value);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`gap-1 rounded border border-border bg-inset p-1 ${fullWidth ? "flex w-full" : "inline-flex"}`}
    >
      {options.map(({ value: optionValue, label, icon: Icon }, index) => {
        const active = optionValue === value;
        return (
          <button
            key={optionValue}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(optionValue)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
              fullWidth ? "flex-1" : ""
            } ${active ? "bg-primary text-primary-fg" : "text-muted hover:text-fg"}`}
          >
            {Icon && <Icon className="size-3.5" aria-hidden />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
