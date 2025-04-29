import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { promises as fs } from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';

export interface MdxContent {
  content: React.ReactElement;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    locale: string;
    originalTitle?: string;
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

async function findPostInDirectory(
  postsDirectory: string,
  slug: string
): Promise<MdxContent | null> {
  try {
    const files = await fs.readdir(postsDirectory);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(postsDirectory, file);
      const source = await fs.readFile(filePath, 'utf8');
      const post = await processMdx(source);

      // Verifica o slug do título atual
      if (slugify(post.frontmatter.title) === slug) {
        return post;
      }

      // Verifica o slug do título original
      if (post.frontmatter.originalTitle && slugify(post.frontmatter.originalTitle) === slug) {
        return post;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function getBlogPost(slug: string, locale: string): Promise<MdxContent | null> {
  // Primeiro tenta encontrar no locale atual
  const currentLocalePost = await findPostInDirectory(
    path.join(process.cwd(), 'src/content/blog', locale),
    slug
  );

  if (currentLocalePost) {
    return currentLocalePost;
  }

  // Se não encontrou, procura em todos os outros locales
  for (const targetLocale of routing.locales) {
    if (targetLocale === locale) continue;

    const post = await findPostInDirectory(
      path.join(process.cwd(), 'src/content/blog', targetLocale),
      slug
    );

    if (post) {
      // Se encontrou o post em outro locale, procura a versão correspondente no locale desejado
      const originalTitle = post.frontmatter.originalTitle || post.frontmatter.title;
      const translatedPost = await findPostInDirectory(
        path.join(process.cwd(), 'src/content/blog', locale),
        slugify(originalTitle)
      );

      return translatedPost;
    }
  }

  return null;
}

export async function getTranslatedPost(
  currentPost: MdxContent
): Promise<{ [key: string]: string | null }> {
  const translations: { [key: string]: string | null } = {};
  const currentOriginalTitle =
    currentPost.frontmatter.originalTitle || currentPost.frontmatter.title;

  for (const targetLocale of routing.locales) {
    if (targetLocale === currentPost.frontmatter.locale) {
      continue;
    }

    try {
      const postsDirectory = path.join(process.cwd(), 'src/content/blog', targetLocale);
      const files = await fs.readdir(postsDirectory);

      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;

        const filePath = path.join(postsDirectory, file);
        const source = await fs.readFile(filePath, 'utf8');
        const post = await processMdx(source);

        const targetOriginalTitle = post.frontmatter.originalTitle || post.frontmatter.title;

        if (targetOriginalTitle === currentOriginalTitle) {
          translations[targetLocale] = slugify(post.frontmatter.title);
          break;
        }
      }
    } catch {
      translations[targetLocale] = null;
    }
  }

  return translations;
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
