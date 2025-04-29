import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { vi } from 'vitest';
import { ComponentProps } from 'react';

const mockReplace = vi.fn();

// Mock next-intl hooks and navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({
    replace: mockReplace,
  }),
  Link: ({ children, ...props }: ComponentProps<'a'>) => <a {...props}>{children}</a>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock Radix UI dropdown menu
vi.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children, ...props }: ComponentProps<'button'>) => (
    <button {...props}>{children}</button>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Item: ({ children, onClick, ...props }: ComponentProps<'div'>) => (
    <div {...props} onClick={onClick}>
      {children}
    </div>
  ),
}));

describe('Header', () => {
  it('renders the header with navigation links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('posts')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeToggle);

    const html = document.documentElement;
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('renders the language selector', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const languageSelector = screen.getByRole('button', { name: /languageSelector.languages.en/i });
    expect(languageSelector).toBeInTheDocument();
  });

  it('changes locale when language is selected', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const languageSelector = screen.getByRole('button', { name: /languageSelector.languages.en/i });
    fireEvent.click(languageSelector);

    const ptOption = screen.getByText('languageSelector.languages.pt');
    fireEvent.click(ptOption);

    expect(mockReplace).toHaveBeenCalledWith('/en', { locale: 'pt' });
  });
});
