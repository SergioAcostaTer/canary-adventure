import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light"; // SSR fallback
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // apply theme to <html>
  useEffect(() => {
    const d = document.documentElement;
    d.setAttribute("data-theme", theme);
    d.style.colorScheme = theme;
    d.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
