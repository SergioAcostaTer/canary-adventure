// lib/hooks/ui/useTheme.ts
"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function setThemeCookie(value: Theme) {
  // 1 year, secure + lax; remove Secure if developing on http://localhost
  document.cookie = `theme=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Prefer cookie (SSR source of truth), fall back to localStorage, else 'system'
    const cookieTheme = getCookie("theme") as Theme | null;
    const storedTheme = (cookieTheme || (localStorage.getItem("theme") as Theme | null)) ?? "system";

    setTheme(storedTheme);

    const resolve = (t: Theme): "light" | "dark" => {
      if (t === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return t;
    };

    const apply = (v: "light" | "dark") => {
      document.documentElement.setAttribute("data-theme", v);
      (document.documentElement as HTMLElement).style.colorScheme = v;
    };

    const initialResolved = resolve(storedTheme);
    setResolvedTheme(initialResolved);
    apply(initialResolved);

    // Track system changes if 'system'
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (storedTheme === "system") {
        const v = mq.matches ? "dark" : "light";
        setResolvedTheme(v);
        apply(v);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    const next = resolvedTheme === "light" ? "dark" : "light";
    setTheme(next);
    setResolvedTheme(next);

    // Persist
    localStorage.setItem("theme", next);
    setThemeCookie(next);

    // Apply
    document.documentElement.setAttribute("data-theme", next);
    (document.documentElement as HTMLElement).style.colorScheme = next;
  };

  const setThemeValue = (next: Theme) => {
    if (!mounted) return;

    setTheme(next);
    localStorage.setItem("theme", next);
    setThemeCookie(next);

    const resolved = next === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : next;

    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    (document.documentElement as HTMLElement).style.colorScheme = resolved;
  };

  return {
    theme: resolvedTheme, // for UI (always 'light' | 'dark')
    systemTheme: theme,   // the saved setting ('light' | 'dark' | 'system')
    toggleTheme,
    setTheme: setThemeValue,
    mounted,
  };
}
