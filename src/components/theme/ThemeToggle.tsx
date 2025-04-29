'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations('theme');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover">
        <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[120px] rounded-md border border-border bg-card p-1 shadow-md">
          <DropdownMenu.Item
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary"
            onClick={() => setTheme('light')}
          >
            {t('light')}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary"
            onClick={() => setTheme('dark')}
          >
            {t('dark')}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary"
            onClick={() => setTheme('system')}
          >
            {t('system')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
} 