import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './Header'

// Mock usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
}))

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header />)
    
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders language selector', () => {
    render(<Header />)
    
    expect(screen.getByText('English')).toBeInTheDocument()
  })
}) 