import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-content-secondary">The page you are looking for does not exist.</p>
      <Link
        href="/en"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg-base"
      >
        Back to home
      </Link>
    </section>
  );
}
