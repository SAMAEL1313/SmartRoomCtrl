type LabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function Label({ children, className = "" }: LabelProps) {
  return (
    <span
      className={`font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}