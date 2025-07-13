import { useState } from "react";

export default function useTheme() {
  const getInitialTheme = (): "light" | "dark" => {
    if (typeof document === "undefined") return "dark";
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    return htmlTheme === "dark" ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return { theme, toggleTheme };
}
