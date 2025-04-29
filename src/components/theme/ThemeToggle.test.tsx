import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '@/providers/ThemeProvider';

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check if the theme was toggled
    const html = document.documentElement;
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('shows correct icon based on theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    const initialIcon = button.querySelector('svg');
    expect(initialIcon).toBeInTheDocument();

    fireEvent.click(button);
    const newIcon = button.querySelector('svg');
    expect(newIcon).toBeInTheDocument();
    expect(newIcon).not.toEqual(initialIcon);
  });
});
