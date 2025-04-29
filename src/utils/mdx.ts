import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { MdxPost } from '@/app/api/posts/route';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function processMdx(source: string): Promise<MdxPost> {
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });

  return {
    content,
    frontmatter: frontmatter as MdxPost['frontmatter'],
  };
}

export async function getBlogPost(slug: string, locale: string): Promise<MdxContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/posts?locale=${locale}&slug=${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export async function getBlogPosts(locale: string): Promise<MdxContent[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/posts?locale=${locale}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export async function getAllPosts(locale: string): Promise<MdxContent[]> {
  return getBlogPosts(locale);
}
