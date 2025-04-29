'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PersonIcon, SunIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { NavItem } from './types';

const navItems: NavItem[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
];

export function Header() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-header backdrop-blur supports-[backdrop-filter]:bg-header/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between max-w-[670px] mx-auto px-5">
          <Link href={`/${lang}`} className="flex items-center space-x-2 text-text-primary hover:text-link">
            <PersonIcon className="h-6 w-6" />
          </Link>


          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`transition-colors hover:text-link ${
                  pathname.includes(item.href) ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover"
              onClick={() => {/* Add theme toggle logic */}}
            >
              <SunIcon className="h-4 w-4" />
            </button>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex h-9 px-3 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover">
                {lang === 'pt' ? 'Português' : 'English'}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[120px] rounded-md border border-border bg-card p-1 shadow-md">
                  <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary">
                    <Link href={pathname.replace(/^\/[^\/]+/, '/en')} className="flex-1">
                      English
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-secondary outline-none hover:bg-button-hover hover:text-text-primary">
                    <Link href={pathname.replace(/^\/[^\/]+/, '/pt')} className="flex-1">
                      Português
                    </Link>
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