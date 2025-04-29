import { getTranslations } from 'next-intl/server';

export default async function BlogPage() {
  const t = await getTranslations('navigation');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('posts')}</h1>
      <p>Blog content coming soon...</p>
    </main>
  );
}
