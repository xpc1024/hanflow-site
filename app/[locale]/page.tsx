import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Architecture } from '@/components/landing/Architecture';
import { QuickDemo } from '@/components/landing/QuickDemo';
import { CTA } from '@/components/landing/CTA';

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
      <Architecture />
      <QuickDemo />
      <CTA locale={locale} />
    </>
  );
}
