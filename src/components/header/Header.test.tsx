import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { vi } from 'vitest';
import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import userEvent from '@testing-library/user-event';
const mockReplace = vi.fn();
const mockPathname = vi.fn();
const mockRouter = vi.fn();
const mockTranslations = vi.fn((key: string) => key) as unknown as ReturnType<
  typeof useTranslations
>;

// Mock next-intl hooks and navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => mockRouter(),
  Link: ({ children, ...props }: ComponentProps<'a'>) => <a {...props}>{children}</a>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
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
  beforeEach(() => {
    mockPathname.mockReturnValue('/blog');
    mockRouter.mockReturnValue({
      replace: mockReplace,
    } as unknown as AppRouterInstance);
  });

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
  });

  it('renders the theme toggle buttons for both mobile and desktop', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const mobileThemeToggle = screen.getByTestId('theme-toggle-mobile');
    const desktopThemeToggle = screen.getByTestId('theme-toggle-desktop');

    expect(mobileThemeToggle).toBeInTheDocument();
    expect(desktopThemeToggle).toBeInTheDocument();
  });

  it('renders the language selector buttons for both mobile and desktop', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const mobileLanguageSelector = screen.getByTestId('language-selector-mobile');
    const desktopLanguageSelector = screen.getByTestId('language-selector-desktop');

    expect(mobileLanguageSelector).toBeInTheDocument();
    expect(desktopLanguageSelector).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const themeToggle = screen.getByTestId('theme-toggle-desktop');
    fireEvent.click(themeToggle);

    const html = document.documentElement;
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('changes locale when language is selected', async () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const languageSelector = screen.getByTestId('language-selector-desktop');

    await userEvent.click(languageSelector);

    const ptOption = await screen.findAllByTestId('language-option-pt');

    await userEvent.click(ptOption[0]);

    expect(mockReplace).toHaveBeenCalledWith('/blog', { locale: 'pt' });
  });
});
