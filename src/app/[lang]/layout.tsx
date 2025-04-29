import { Header } from '@/components/Header';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
