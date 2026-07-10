import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n';

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <>{children}</>;
}
