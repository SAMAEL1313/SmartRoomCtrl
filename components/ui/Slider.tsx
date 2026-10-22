"use client";

import { useId } from "react";
import { Label } from "./Label";

type SliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
};

export function Slider({ label, value, onChange, min, max, step = 1, unit = "" }: SliderProps) {
  const id = useId();
  const suffix = unit ? ` ${unit}` : "";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <Label>{label}</Label>
        </label>
        <span className="font-mono text-sm text-fg">
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value}${suffix}`}
        className="mt-3 w-full cursor-pointer accent-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}
