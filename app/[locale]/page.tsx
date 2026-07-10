import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <Features />
    </>
  );
}
