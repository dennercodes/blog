import { getTagColors } from '@/utils/tags';

interface TagProps {
  name: string;
}

export function Tag({ name }: TagProps) {
  const { background, text } = getTagColors(name);

  return (
    <span
      className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${background} ${text}`}
    >
      {name}
    </span>
  );
}
