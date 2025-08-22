"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Theme initialization on client side
    try {
      const theme = localStorage.getItem("theme");
      const d = document.documentElement;

      if (theme === "system" || !theme) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const isDark = mediaQuery.matches;

        d.setAttribute("data-theme", isDark ? "dark" : "light");
        d.style.colorScheme = isDark ? "dark" : "light";

        // Listen for changes
        const handleChange = (e: MediaQueryListEvent) => {
          d.setAttribute("data-theme", e.matches ? "dark" : "light");
          d.style.colorScheme = e.matches ? "dark" : "light";
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else if (theme === "light" || theme === "dark") {
        d.setAttribute("data-theme", theme);
        d.style.colorScheme = theme;
      }
    } catch (error) {
      console.warn("Theme initialization failed:", error);
    }
  }, []);

  return <>{children}</>;
}
