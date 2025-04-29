import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('should render title and description', () => {
    render(<PageHeader title="Test Title" description="Test Description" />);

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.queryByText(/"/)).not.toBeInTheDocument(); // No quote marks should be present
  });

  it('should render with quote when provided', () => {
    const quote = 'Test Quote';
    render(<PageHeader title="Test Title" description="Test Description" quote={quote} />);

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByText(`"${quote}"`)).toBeInTheDocument();
  });

  it('should apply gradient styles to title', () => {
    render(<PageHeader title="Test Title" description="Test Description" />);

    const title = screen.getByRole('heading', { name: /test title/i });
    expect(title).toHaveClass(
      'text-6xl',
      'font-bold',
      'bg-gradient-to-r',
      'from-blue-600',
      'to-purple-600',
      'text-transparent',
      'bg-clip-text'
    );
  });

  it('should apply correct spacing classes', () => {
    render(<PageHeader title="Test Title" description="Test Description" quote="Test Quote" />);

    const container = screen.getByText(/test title/i).closest('div');
    expect(container).toHaveClass('mb-8');

    const title = screen.getByRole('heading', { name: /test title/i });
    expect(title).toHaveClass('mb-6');

    const description = screen.getByText(/test description/i);
    expect(description).toHaveClass('mb-8');

    const quote = screen.getByText(/"test quote"/i);
    expect(quote).toHaveClass('mb-12');
  });
});
