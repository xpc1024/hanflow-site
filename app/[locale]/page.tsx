import { Hero } from '@/components/landing/Hero';

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Hero locale={locale} />;
}
