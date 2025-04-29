import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders social media links', () => {
    render(<Footer />);

    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/denner-rondinely-da-silva'
    );
    expect(screen.getByLabelText('Instagram')).toHaveAttribute(
      'href',
      'https://instagram.com/denner.land'
    );
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/dennercodes'
    );
  });

  it('renders links with correct attributes', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
