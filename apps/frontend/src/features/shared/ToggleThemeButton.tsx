"use client";
import useTheme from "@/lib/hooks/ui/useTheme";
import { Moon, Sun } from "lucide-react";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};
