"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Building2,
  ChevronsUpDown,
  Cpu,
  LayoutGrid,
  ScrollText,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import { Label } from "@/components/ui/Label";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/automation", label: "Automation", icon: SlidersHorizontal },
  { href: "/activity", label: "Activity log", icon: ScrollText },
  { href: "/devices", label: "Devices", icon: Cpu },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Dark backdrop behind the menu: mobile only */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 md:hidden ${open ? "block" : "hidden"}`}
      />

      <aside
        id="sidebar"
        // "invisible" when closed keeps Tab out of the off-screen drawer on mobile
        className={`fixed inset-y-0 left-0 z-50 flex w-55 shrink-0 flex-col overflow-y-auto border-r border-border bg-bg px-3 py-4 transition-[translate,visibility] duration-200 md:visible md:static md:z-auto md:w-45 md:translate-x-0 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        {/* Close button: mobile only */}
        <div className="mb-4 flex justify-end md:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-8 items-center justify-center rounded text-muted hover:bg-inset hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {/* Workspace selector (visual only) */}
        <Label className="px-2">Workspace</Label>
        <button
          type="button"
          className="mt-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-[13px] text-fg hover:bg-inset focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Building2 className="size-4 text-muted" aria-hidden />
          <span className="flex-1 text-left">Home studio</span>
          <ChevronsUpDown className="size-3.5 text-muted" aria-hidden />
        </button>

        {/* Main navigation */}
        <nav aria-label="Main" className="mt-6">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded border px-2 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                      active
                        ? "border-accent/20 bg-accent-soft font-medium text-accent"
                        : "border-transparent text-muted hover:bg-inset hover:text-fg"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Connected room */}
        <div className="mt-8">
          <Label className="px-2">Connected room</Label>
          <div className="mt-2 flex items-center gap-2 px-2 py-1.5 text-[13px] text-fg">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Studio
            <span className="font-mono text-[11px] text-muted">/ 01</span>
          </div>
        </div>
      </aside>
    </>
  );
}