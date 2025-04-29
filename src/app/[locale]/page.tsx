import { redirect } from '@/i18n/navigation';
import { setRequestLocale } from "next-intl/server";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params }: HomeProps) {
  setRequestLocale(params.locale);
  return redirect({
    href: '/blog',
    locale: params.locale,
  });
}