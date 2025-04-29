import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/ThemeProvider';

type BlogLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function BlogLayout({ children, params }: BlogLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
