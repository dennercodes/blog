import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

// Add any global setup here
beforeAll(() => {
  // Setup code that runs before all tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterAll(() => {
  // Cleanup code that runs after all tests
});
