'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DocSiblings } from '@/lib/docs';

export function DocsPager({
  siblings,
  locale,
}: {
  siblings: DocSiblings;
  locale: string;
}) {
  const t = useTranslations('docs');
  return (
    <nav className="mt-16 flex items-center justify-between border-t border-edge pt-6">
      {siblings.previous ? (
        <Link
          href={`/${locale}/docs/${siblings.previous.slug}`}
          className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('previous')}: {siblings.previous.title}
        </Link>
      ) : (
        <span />
      )}
      {siblings.next ? (
        <Link
          href={`/${locale}/docs/${siblings.next.slug}`}
          className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary"
        >
          {t('next')}: {siblings.next.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
