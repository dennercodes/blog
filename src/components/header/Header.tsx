'use client';

import { usePathname, Link, useRouter } from '@/i18n/navigation';
import { PersonIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { NavItem } from './types';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const navItems: NavItem[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
];

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('navigation');

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-header backdrop-blur supports-[backdrop-filter]:bg-header/60 flex items-center justify-center">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between max-w-[670px] mx-auto px-5">
          <Link href="/" className="flex items-center space-x-2 text-text-primary hover:text-link">
            <PersonIcon className="h-6 w-6" />
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-link ${
                  pathname.includes(item.href) ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {t(item.label.toLowerCase())}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex h-9 px-3 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover">
                {t(`languageSelector.languages.${locale}`)}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[120px] rounded-md border border-border bg-card p-1 shadow-md">
                  <DropdownMenu.Item 
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary"
                    onClick={() => handleLocaleChange('en')}
                  >
                    {t('languageSelector.languages.en')}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item 
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary"
                    onClick={() => handleLocaleChange('pt')}
                  >
                    {t('languageSelector.languages.pt')}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </header>
  );
} 