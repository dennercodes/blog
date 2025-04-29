'use client';

import { usePathname, Link } from '@/i18n/navigation';
import { PersonIcon } from '@radix-ui/react-icons';
import { NavItem } from './types';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSelector } from '@/components/language/LanguageSelector';

const navItems: NavItem[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
];

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <header className="sticky top-0 z-50 w-full bg-header backdrop-blur supports-[backdrop-filter]:bg-header/60 flex items-center justify-center">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between max-w-[670px] mx-auto px-5">
          <Link href="/" className="flex items-center space-x-2 text-text-primary hover:text-link">
            <PersonIcon className="h-6 w-6" />
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
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

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
