'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({
  value,
  copiedLabel,
  className = '',
}: {
  value: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard may be unavailable; fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy"
      className={`inline-flex items-center gap-1.5 rounded-code border border-edge px-2.5 py-1.5 text-xs text-content-secondary transition-colors hover:text-content-primary ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? copiedLabel : null}
    </button>
  );
}
