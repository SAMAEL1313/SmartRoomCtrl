import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type TopBarProps = {
  menuOpen: boolean;
  onMenuClick: () => void;
};

export function TopBar({ menuOpen, onMenuClick }: TopBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-bg px-4">
      {/* Menu button: phones and small tablets only */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        className="inline-flex size-8 items-center justify-center rounded text-muted hover:bg-inset hover:text-fg focus-visible:outline-2 focus-visible:outline-accent md:hidden"
      >
        <Menu className="size-4" aria-hidden />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="flex size-7 items-center justify-center rounded border border-border bg-surface font-mono text-[11px] font-semibold text-fg"
        >
          &gt;_
        </div>
        <span className="font-mono text-xs font-semibold tracking-[0.08em] text-fg">
          ROOM / CTRL
        </span>
        <span className="font-mono text-[10px] text-muted">v.2.4</span>
      </div>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}