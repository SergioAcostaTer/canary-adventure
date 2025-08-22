// lib/hooks/ui/useTheme.ts
"use client";
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || 'system';
    setTheme(initialTheme);

    // Function to resolve system theme
    const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
      if (currentTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return currentTheme;
    };

    // Set initial resolved theme
    const resolved = resolveTheme(initialTheme);
    setResolvedTheme(resolved);

    // Apply theme to document
    const applyTheme = (resolvedTheme: 'light' | 'dark') => {
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      document.documentElement.style.colorScheme = resolvedTheme;
    };

    applyTheme(resolved);

    // Listen for system theme changes when theme is 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newResolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    if (!mounted) return;

    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setResolvedTheme(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Apply immediately
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.style.colorScheme = newTheme;
  };

  const setThemeValue = (newTheme: Theme) => {
    if (!mounted) return;

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const resolved = newTheme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;

    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
  };

  return {
    theme: resolvedTheme, // Return resolved theme for UI consistency
    systemTheme: theme,   // Return actual theme setting
    toggleTheme,
    setTheme: setThemeValue,
    mounted, // Export mounted state for components
  };
}