import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { promises as fs } from 'fs';
import path from 'path';

export interface MdxContent {
  content: React.ReactElement;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    locale: string;
    [key: string]: string | string[] | undefined;
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function processMdx(source: string): Promise<MdxContent> {
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
    frontmatter: frontmatter as MdxContent['frontmatter'],
  };
}

export async function getBlogPost(slug: string, locale: string): Promise<MdxContent | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog', locale);
    const files = await fs.readdir(postsDirectory);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(postsDirectory, file);
      const source = await fs.readFile(filePath, 'utf8');
      const post = await processMdx(source);

      if (slugify(post.frontmatter.title) === slug) {
        return post;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function getAllPosts(locale: string): Promise<MdxContent[]> {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog', locale);

  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const source = await fs.readFile(path.join(postsDirectory, file), 'utf8');
          return processMdx(source);
        })
    );

    return posts.sort((a, b) => {
      if (!a.frontmatter.date || !b.frontmatter.date) return 0;
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch {
    return [];
  }
}
