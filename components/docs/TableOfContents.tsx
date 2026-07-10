'use client';

import { useTranslations } from 'next-intl';
import type { TocItem } from '@/lib/docs';

export function TableOfContents({ items }: { items: TocItem[] }) {
  const t = useTranslations('docs');
  if (items.length === 0) return null;
  return (
    <nav className="hidden w-48 shrink-0 lg:block">
      <div className="text-xs font-semibold uppercase tracking-wider text-content-muted">
        {t('onThisPage')}
      </div>
      <ul className="mt-3 space-y-2 border-l border-edge">
        {items.map((it) => (
          <li key={it.slug} style={{ paddingLeft: it.depth === 3 ? '1.25rem' : '0.75rem' }}>
            <a
              href={`#${it.slug}`}
              className="-ml-px block border-l-2 border-transparent py-0.5 text-xs text-content-secondary hover:text-content-primary"
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
