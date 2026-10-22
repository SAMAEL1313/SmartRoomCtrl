import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "outline";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-primary bg-primary text-primary-fg hover:opacity-90",
  outline: "border-border bg-transparent text-fg hover:bg-surface",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: LucideIcon;
};

export function Button({
  variant = "outline",
  icon: Icon,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded border px-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </button>
  );
}
