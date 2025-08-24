"use client";
import useTheme from "@/modules/core/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex flex-col items-center cursor-pointer group bg-transparent p-0 border-0"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      suppressHydrationWarning
    >
      {mounted ? (
        theme === "light" ? (
          <Moon
            size={24}
            className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
          />
        ) : (
          <Sun
            size={24}
            className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
          />
        )
      ) : (
        <div className="w-6 h-6 rounded-full border-2 border-current opacity-60 text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors" />
      )}
    </button>
  );
};
