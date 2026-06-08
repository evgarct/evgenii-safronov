"use client";

import { useEffect, useRef } from "react";

const themes = ["light", "dark", "oled"] as const;
type Theme = (typeof themes)[number];

const isTheme = (value: string | null): value is Theme =>
  themes.includes(value as Theme);

export function ThemeSelector() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const currentTheme = document.documentElement.dataset.theme ?? null;
    const nextTheme = isTheme(storedTheme)
      ? storedTheme
      : isTheme(currentTheme)
        ? currentTheme
        : "light";

    document.documentElement.dataset.theme = nextTheme;
    if (selectRef.current) selectRef.current.value = nextTheme;
  }, []);

  function updateTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <label className="relative">
      <span className="sr-only">Color theme</span>
      <select
        ref={selectRef}
        aria-label="Color theme"
        className="h-[var(--control-height-sm)] rounded-[var(--shape-control)] border border-border bg-background px-[var(--spacing-control-sm)] text-xs text-foreground outline-none transition-colors focus-visible:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/30"
        defaultValue="light"
        onChange={(event) => updateTheme(event.target.value as Theme)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="oled">OLED</option>
      </select>
    </label>
  );
}
