import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from './LanguageSelector';
import { vi } from 'vitest';
import { ComponentProps } from 'react';

const mockReplace = vi.fn();

// Mock next-intl hooks and navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({
    replace: mockReplace,
  }),
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

describe('LanguageSelector', () => {
  it('renders the language selector button', () => {
    render(<LanguageSelector />);

    const languageSelector = screen.getByRole('button', { name: 'languages.en' });
    expect(languageSelector).toBeInTheDocument();
  });

  it('changes locale when language is selected', () => {
    render(<LanguageSelector />);

    const languageSelector = screen.getByRole('button', { name: 'languages.en' });
    fireEvent.click(languageSelector);

    const ptOption = screen.getByText('languages.pt');
    fireEvent.click(ptOption);

    expect(mockReplace).toHaveBeenCalledWith('/en', { locale: 'pt' });
  });
});
