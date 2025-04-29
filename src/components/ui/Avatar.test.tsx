import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('should render with initials', () => {
    render(<Avatar initials="DR" />);

    const avatar = screen.getByText('DR');
    expect(avatar).toBeInTheDocument();
  });

  it('should apply gradient background styles', () => {
    render(<Avatar initials="DR" />);

    const avatarRoot = screen.getByText('DR').parentElement;
    expect(avatarRoot).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
  });

  it('should have correct dimensions', () => {
    render(<Avatar initials="DR" />);

    const avatarRoot = screen.getByText('DR').parentElement;
    expect(avatarRoot).toHaveClass('h-8', 'w-8');
  });

  it('should have rounded corners', () => {
    render(<Avatar initials="DR" />);

    const avatarRoot = screen.getByText('DR').parentElement;
    expect(avatarRoot).toHaveClass('rounded-full');
  });
});
