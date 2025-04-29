import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export interface MdxContent {
  content: React.ReactElement;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    [key: string]: string | string[] | undefined;
  };
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
