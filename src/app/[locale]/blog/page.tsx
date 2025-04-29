import { getAllPosts, slugify } from '@/utils/mdx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const posts = await getAllPosts(locale);

  return (
    <main className="flex flex-col flex-1 max-w-[670px] mx-auto px-5 py-16">
      <div className="w-full divide-y divide-border">
        {posts.map(post => (
          <article key={post.frontmatter.title} className="py-8 first:pt-0">
            <Link href={`/blog/${slugify(post.frontmatter.title)}`} className="group">
              <time className="text-sm text-text-secondary mb-2 block">
                {new Date(post.frontmatter.date || '').toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="text-3xl font-bold mb-2 text-text-primary group-hover:text-link transition-colors">
                {post.frontmatter.title}
              </h2>
              {post.frontmatter.description && (
                <p className="text-text-secondary text-lg">{post.frontmatter.description}</p>
              )}
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="py-8">
            <p className="text-text-secondary text-lg">{t('noPosts')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
