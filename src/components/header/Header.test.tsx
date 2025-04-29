import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { ComponentProps } from 'react';

// Mock next-intl hooks and navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({
    replace: vi.fn(),
  }),
  Link: ({ children, ...props }: ComponentProps<'a'>) => <a {...props}>{children}</a>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header />);

    expect(screen.getByText('posts')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
  });

  it('renders language selector', () => {
    render(<Header />);

    expect(screen.getByText('languageSelector.languages.en')).toBeInTheDocument();
  });
});
