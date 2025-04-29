import { redirect } from '@/i18n/navigation';
import { setRequestLocale } from "next-intl/server";


export interface HomeProps {
  params: {
    lang: string;
  };
}

export default function HomePage({ params }: HomeProps) {
  setRequestLocale(params.lang);
  return redirect({
    href: '/blog',
    locale: params.lang,
  });
}