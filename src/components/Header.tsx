'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GearIcon, PersonIcon, SunIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
];

export function Header() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo/Profile */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <PersonIcon className="h-6 w-6" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname.includes(item.href) ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
              onClick={() => {/* Add theme toggle logic */}}
            >
              <SunIcon className="h-4 w-4" />
            </button>

            {/* Language selector */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex h-9 px-3 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                {lang === 'pt' ? 'Português' : 'English'}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[120px] rounded-md border bg-popover p-1 shadow-md">
                  <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                    <Link href={pathname.replace(/^\/[^\/]+/, '/en')} className="flex-1">
                      English
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                    <Link href={pathname.replace(/^\/[^\/]+/, '/pt')} className="flex-1">
                      Português
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Settings */}
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              <GearIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 