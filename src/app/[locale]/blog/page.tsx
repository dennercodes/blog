import { getTranslations } from 'next-intl/server';

export default async function BlogPage() {
  const t = await getTranslations('navigation');

  return (
    <main className="flex flex-col flex-1 items-start justify-between max-w-[670px] mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-4">{t('posts')}</h1>
      <p>Blog content coming soon...</p>
    </main>
  );
}
