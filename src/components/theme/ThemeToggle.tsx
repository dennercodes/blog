'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  'data-testid'?: string;
}

export function ThemeToggle({ 'data-testid': dataTestId }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        data-testid={dataTestId}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover"
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      data-testid={dataTestId}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover cursor-pointer"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <MoonIcon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </button>
  );
}
