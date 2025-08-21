import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export default function useTheme() {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light"; // SSR fallback
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;
    return "system";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // apply theme to <html>
  const apply = useCallback((t: Theme) => {
    const d = document.documentElement;

    const effective: "light" | "dark" =
      t === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : t;

    d.setAttribute("data-theme", effective);
    d.style.colorScheme = effective;
    d.classList.toggle("dark", effective === "dark");
  }, []);

  // apply on mount + whenever theme changes
  useEffect(() => {
    apply(theme);
    localStorage.setItem("theme", theme);
  }, [theme, apply]);

  // watch system preference if theme === "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent) => {
      apply(e.matches ? "dark" : "light");
    };

    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [theme, apply]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
