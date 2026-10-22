type PanelProps = {
  number: string; // "01", "02", ...
  title: string;
  tag?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function Panel({
  number,
  title,
  tag,
  footer,
  children,
  className = "",
  bodyClassName = "p-4",
}: PanelProps) {
  const titleId = `panel-${number}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className={`flex min-w-0 flex-col rounded-md border border-border bg-surface ${className}`}
    >
      <header className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="font-mono text-[10px] text-muted">{number}</span>
        <h2 id={titleId} className="text-[13px] font-medium text-fg">
          {title}
        </h2>
        {tag && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {tag}
          </span>
        )}
      </header>

      <div className={`flex-1 ${bodyClassName}`}>{children}</div>

      {footer && (
        <footer className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {footer}
        </footer>
      )}
    </section>
  );
}
