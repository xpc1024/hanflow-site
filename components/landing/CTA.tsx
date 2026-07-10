'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CopyButton } from '@/components/ui/CopyButton';

export function CTA({ locale }: { locale: string }) {
  const t = useTranslations('cta');
  const cmd = 'docker compose up -d';
  return (
    <section className="relative overflow-hidden border-t border-edge py-20 md:py-32">
      <div className="accent-glow pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>
        <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-code border border-edge bg-bg-elevated px-4 py-3 text-left">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-content-muted">{t('installLabel')}</div>
            <code className="font-mono text-sm text-content-primary">{cmd}</code>
          </div>
          <CopyButton value={cmd} copiedLabel={t('copied')} />
        </div>
        <div className="mt-8">
          <Link
            href={`/${locale}/docs/quick-start`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg-base transition-transform active:scale-[0.98]"
          >
            {t('title')}
          </Link>
        </div>
      </div>
    </section>
  );
}
