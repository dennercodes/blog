import { promises as fs } from 'fs';
import path from 'path';
import { processMdx } from '@/utils/mdx';
import { MdxContent } from '@/components/mdx/MdxContent';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  try {
    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');
    const { content, frontmatter } = await processMdx(source);

    return (
      <main className="flex flex-col flex-1 items-start justify-between max-w-[670px] mx-auto px-5 py-16">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="text-text-secondary mb-8">{frontmatter.description}</p>
          )}
          <MdxContent>{content}</MdxContent>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
