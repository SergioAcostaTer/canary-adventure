"use client";
import useTheme from "@/lib/hooks/ui/useTheme";
import { Moon, Sun } from "lucide-react";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer w-6 h-6 flex items-center justify-center"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      suppressHydrationWarning
    >
      {mounted ? (
        theme === "light" ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-current opacity-50" />
      )}
    </button>
  );
};
