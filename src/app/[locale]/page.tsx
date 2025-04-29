import { redirect } from '@/i18n/navigation';
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return redirect({
    href: '/blog',
    locale,
  });
}