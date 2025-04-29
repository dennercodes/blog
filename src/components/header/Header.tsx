'use client';

import { usePathname, Link } from '@/i18n/navigation';
import { NavItem } from './types';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { Avatar } from '../ui/Avatar';

const navItems: NavItem[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
];

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <header className="sticky top-0 z-50 w-full bg-header backdrop-blur supports-[backdrop-filter]:bg-header/60">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto px-5 py-2 sm:py-0">
          <div className="flex w-full sm:w-auto items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-text-primary hover:text-link"
            >
              <Avatar initials="DR" />
            </Link>

            <div className="flex items-center space-x-2 sm:hidden">
              <ThemeToggle data-testid="theme-toggle-mobile" />
              <LanguageSelector data-testid="language-selector-mobile" />
            </div>
          </div>

          <nav className="flex items-center space-x-6 text-md font-medium py-2 sm:py-4">
            {navItems.map(item => (
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

          <div className="hidden sm:flex items-center space-x-2">
            <ThemeToggle data-testid="theme-toggle-desktop" />
            <LanguageSelector data-testid="language-selector-desktop" />
          </div>
        </div>
      </div>
    </header>
  );
}
