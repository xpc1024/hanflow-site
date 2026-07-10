import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-content-muted">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {c.href ? (
            <Link href={c.href} className="hover:text-content-primary">
              {c.label}
            </Link>
          ) : (
            <span className="text-content-secondary">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
