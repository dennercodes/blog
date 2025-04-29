import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A place where I share my thoughts and experiences',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
