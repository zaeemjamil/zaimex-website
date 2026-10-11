"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text ${className ?? ""}`}
    >
      {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
    </button>
  );
}
