import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { routing } from '@/i18n/routing';

interface PostLanguageSelectorProps {
  translations: { [key: string]: string | null };
  currentLocale: string;
}

export function PostLanguageSelector({ translations, currentLocale }: PostLanguageSelectorProps) {
  const t = useTranslations('languageSelector');

  return (
    <div className="flex items-center gap-2 mt-8 text-sm text-text-secondary">
      <span>{t('label')}:</span>
      <div className="flex gap-2">
        {routing.locales.map(locale => {
          if (locale === currentLocale) {
            return (
              <span key={locale} className="font-medium text-text-primary">
                {t(`languages.${locale}`)}
              </span>
            );
          }

          const translatedSlug = translations[locale];
          if (!translatedSlug) {
            return (
              <span
                key={locale}
                className="opacity-50 cursor-not-allowed"
                title={`${t(`languages.${locale}`)} version not available`}
              >
                {t(`languages.${locale}`)}
              </span>
            );
          }

          return (
            <Link
              key={locale}
              href={`/blog/${translatedSlug}`}
              locale={locale}
              className="hover:text-link transition-colors"
            >
              {t(`languages.${locale}`)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
