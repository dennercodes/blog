import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { vi } from 'vitest';
import { ComponentProps, ReactNode } from 'react';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

interface LinkProps extends ComponentProps<'a'> {
  children: ReactNode;
  href: string;
}

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/blog',
  useTranslations: () => (key: string) => key,
  Link: ({ children, ...props }: LinkProps) => <a {...props}>{children}</a>,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe('Header', () => {
  it('renders the header with logo and navigation', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
  });
});
