"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "zaimex-theme";

/** Inline, render-blocking script — sets the theme class before paint to avoid a flash. */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Deliberately reading DOM state after mount, rather than in the useState
    // initializer: the blocking <script> in the document head already set the
    // correct class before hydration, but reading `document` during the
    // initial render would differ between the server pass and the client
    // pass and cause a hydration mismatch. Correcting it in an effect (after
    // hydration completes) is the standard-safe pattern for this case.
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage unavailable — theme just won't persist across visits.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
