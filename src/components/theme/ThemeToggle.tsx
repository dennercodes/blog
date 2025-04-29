'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="sr-only">Toggle theme</span>
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
} 