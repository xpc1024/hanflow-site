'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n';
import { Check, ChevronDown } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
] as const;

export function LocaleSwitch() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // next-intl's `usePathname()` strips the locale prefix, so infer the active
  // locale from `useLocale()` (design §8.4) rather than parsing the pathname.
  const active = locale === 'zh' ? 'zh' : 'en';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary transition-colors"
        aria-expanded={open}
      >
        {active === 'zh' ? '中文' : 'EN'}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 rounded-code border border-edge bg-bg-elevated p-1 shadow-xl">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                router.replace(pathname, { locale: l.code });
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded px-3 py-2 text-sm text-content-secondary hover:bg-bg-subtle hover:text-content-primary"
            >
              {l.label}
              {active === l.code && <Check className="h-3.5 w-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
