type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string; // accessible name, e.g. "Enable RULE-01"
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        checked ? "border-accent bg-accent" : "border-border bg-inset"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 size-3.5 rounded-full transition-all ${
          checked ? "left-4.5 bg-primary-fg" : "left-0.5 bg-muted"
        }`}
      />
    </button>
  );
}
