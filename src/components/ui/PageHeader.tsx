interface PageHeaderProps {
  title: string;
  description: string;
  quote?: string;
}

export function PageHeader({ title, description, quote }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text leading-normal">
        {title}
      </h1>
      <p className="text-xl text-text-secondary mb-8">{description}</p>
      {quote && <p className="text-2xl font-medium mb-12 italic">&quot;{quote}&quot;</p>}
    </div>
  );
}
