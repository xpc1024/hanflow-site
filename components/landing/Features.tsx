'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import {
  CanvasIcon,
  DslIcon,
  PrivacyIcon,
  McpIcon,
  RagIcon,
  StudioIcon,
} from './icons';

type Cell = {
  key: 'canvas' | 'dsl' | 'privacy' | 'mcp' | 'rag' | 'studio';
  Icon: typeof CanvasIcon;
  // bento span classes for 3 sizes (wide / square / tall)
  span: string;
  tint?: boolean; // a couple of cells get an accent tint (design 8.6)
};

const CELLS: Cell[] = [
  { key: 'canvas', Icon: CanvasIcon, span: 'md:col-span-3 md:row-span-2', tint: true },
  { key: 'dsl', Icon: DslIcon, span: 'md:col-span-3' },
  { key: 'privacy', Icon: PrivacyIcon, span: 'md:col-span-2' },
  { key: 'mcp', Icon: McpIcon, span: 'md:col-span-2' },
  { key: 'rag', Icon: RagIcon, span: 'md:col-span-2' },
  { key: 'studio', Icon: StudioIcon, span: 'md:col-span-6 md:row-span-1' },
];

export function Features() {
  const t = useTranslations('features');
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-edge py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{t('eyebrow')}</div>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {t('title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-6">
          {CELLS.map(({ key, Icon, span, tint }, i) => (
            <motion.div
              key={key}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-card border p-6 ${
                tint ? 'border-accent/30 bg-bg-elevated' : 'border-edge bg-bg-elevated'
              } ${span}`}
            >
              {tint && (
                <div className="accent-glow pointer-events-none absolute -right-16 -top-16 h-48 w-48" aria-hidden />
              )}
              <div className="relative">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 max-w-prose text-sm text-content-secondary">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
