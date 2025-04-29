'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { getTranslatedPath } from '@/utils/navigation';

interface LanguageSelectorProps {
  'data-testid'?: string;
}

export function LanguageSelector({ 'data-testid': dataTestId }: LanguageSelectorProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('languageSelector');

  const handleLocaleChange = async (newLocale: string) => {
    const translatedPath = await getTranslatedPath(pathname, locale, newLocale);
    router.replace(translatedPath, { locale: newLocale });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        data-testid={dataTestId}
        className="inline-flex h-9 w-[52px] items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text hover:bg-button-hover"
      >
        {t(`languages.${locale}`)}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[120px] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <DropdownMenu.Item
            data-testid="language-option-en"
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => handleLocaleChange('en')}
          >
            {t('languages.en')}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            data-testid="language-option-pt"
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => handleLocaleChange('pt')}
          >
            {t('languages.pt')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
