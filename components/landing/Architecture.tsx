'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

const LAYERS = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const;

export function Architecture() {
  const t = useTranslations('architecture');
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-edge py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{t('eyebrow')}</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t('title')}</h2>
          <ul className="mt-8 space-y-4">
            {LAYERS.map((l) => (
              <li key={l} className="flex flex-col">
                <span className="text-sm font-semibold text-content-primary">{t(`layers.${l}.name`)}</span>
                <span className="text-sm text-content-secondary">{t(`layers.${l}.desc`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between rounded-code border border-edge bg-bg-elevated px-5 py-4"
            >
              <span className="font-mono text-sm text-content-secondary">{t(`layers.${l}.name`)}</span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
