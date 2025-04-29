import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

export interface MdxPost {
  content: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    locale: string;
    [key: string]: string | string[] | undefined;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function processMdx(source: string): Promise<MdxPost> {
  const { content, data: frontmatter } = matter(source);

  return {
    content,
    frontmatter: frontmatter as MdxPost['frontmatter'],
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale');
  const slug = searchParams.get('slug');

  if (!locale) {
    return NextResponse.json({ error: 'Locale is required' }, { status: 400 });
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog', locale);
    const files = await fs.readdir(postsDirectory);

    if (slug) {
      // Buscar um post específico
      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;

        const filePath = path.join(postsDirectory, file);
        const source = await fs.readFile(filePath, 'utf8');
        const post = await processMdx(source);
        const postSlug = slugify(post.frontmatter.title);

        if (postSlug === slug) {
          return NextResponse.json(post);
        }
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Buscar todos os posts
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const source = await fs.readFile(path.join(postsDirectory, file), 'utf8');
          return processMdx(source);
        })
    );

    return NextResponse.json(
      posts.sort((a, b) => {
        if (!a.frontmatter.date || !b.frontmatter.date) return 0;
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
      })
    );
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
