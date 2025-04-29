import 'highlight.js/styles/github-dark.css';

interface MdxContentProps {
  children: React.ReactNode;
}

export function MdxContent({ children }: MdxContentProps) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold prose-a:text-link hover:prose-a:text-link/80 prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border">
      {children}
    </article>
  );
}
