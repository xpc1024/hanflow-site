import Link from 'next/link';
import { useLocale } from 'next-intl';

// Note: in Next.js 14, `not-found` components do not receive `params`, so the
// active locale is resolved at runtime via next-intl's `useLocale()` instead.
export default function DocNotFound() {
  const locale = useLocale();
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Document not found</h1>
      <p className="mt-3 text-content-secondary">This doc does not exist in this version.</p>
      <Link
        href={`/${locale}/docs/quick-start`}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm font-medium hover:border-edge-bright"
      >
        Go to Quick Start
      </Link>
    </section>
  );
}
