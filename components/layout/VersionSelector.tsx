'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown } from 'lucide-react';
import { VERSIONS, LATEST_VERSION } from '@/lib/versions';

export function VersionSelector() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(LATEST_VERSION);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('hanflow-docs-version');
    if (saved && (VERSIONS as readonly string[]).includes(saved)) setCurrent(saved);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary transition-colors"
        aria-expanded={open}
      >
        v{current}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-code border border-edge bg-bg-elevated p-1 shadow-xl">
          {VERSIONS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setCurrent(v);
                window.localStorage.setItem('hanflow-docs-version', v);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded px-3 py-2 text-sm text-content-secondary hover:bg-bg-subtle hover:text-content-primary"
            >
              v{v}
              {v === current && <Check className="h-3.5 w-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
