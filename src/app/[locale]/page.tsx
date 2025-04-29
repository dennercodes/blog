import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/ui/PageHeader';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-5 py-16">
      <div className="max-w-4xl w-full">
        <PageHeader title={t('title')} description={t('description')} quote={t('quote')} />
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t('readBlog')}
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
