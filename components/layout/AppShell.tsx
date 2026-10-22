"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="flex h-dvh flex-col">
      <TopBar menuOpen={menuOpen} onMenuClick={() => setMenuOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar open={menuOpen} onClose={closeMenu} />
        <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}