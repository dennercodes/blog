import { getBlogPost } from './mdx';

const postMap: Record<string, Record<string, string>> = {
  'impossible-components': {
    en: 'impossible-components',
    pt: 'componentes-impossiveis',
  },
};

export async function getTranslatedPath(
  currentPath: string,
  fromLocale: string,
  toLocale: string
): Promise<string> {
  // Se não for um post do blog, retorna o mesmo caminho
  if (!currentPath.startsWith('/blog/')) {
    return currentPath;
  }

  const slug = currentPath.split('/blog/')[1];

  // Tenta encontrar o slug traduzido no mapa
  for (const [, translations] of Object.entries(postMap)) {
    if (translations[fromLocale] === slug) {
      return `/blog/${translations[toLocale]}`;
    }
  }

  // Se não encontrar no mapa, tenta buscar o post correspondente
  const post = await getBlogPost(slug, fromLocale);
  if (!post) {
    return currentPath;
  }

  // Busca o post no idioma de destino
  const translatedPost = await getBlogPost(slug, toLocale);
  if (!translatedPost) {
    return '/blog';
  }

  return `/blog/${slug}`;
}
