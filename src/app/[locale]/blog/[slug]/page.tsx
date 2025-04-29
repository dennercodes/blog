import { getBlogPost } from '@/utils/mdx';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('blog');

  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const { content: mdxSource, frontmatter } = post;

  const { content } = await compileMDX({
    source: mdxSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeHighlight, { ignoreMissing: true }]],
        format: 'mdx',
      },
    },
  });

  return (
    <main className="flex flex-col flex-1 items-start justify-between max-w-[670px] mx-auto px-5 py-16 z-10">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-text-secondary mb-4">{frontmatter.description}</p>
        )}
        {frontmatter.date && (
          <p className="text-text-secondary text-sm mb-8">
            {t('publishedOn', { date: new Date(frontmatter.date).toLocaleDateString(locale) })}
          </p>
        )}
        <div className="flex gap-2 mb-8">
          {frontmatter.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-background-secondary text-text-secondary rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold prose-a:text-link hover:prose-a:text-link/80 prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border">
          {content}
        </article>
      </div>
    </main>
  );
}
