import { existsSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface SidebarItem {
  title: string;
  slug: string;
}

export interface SidebarNode {
  title: string;
  items: SidebarItem[];
}

// Display order + group mapping for the docs sidebar (design spec 4).
const GROUP_ORDER: Record<string, { title: string; files: { file: string; title: string }[] }> = {
  'getting-started': {
    title: 'Getting Started',
    files: [
      { file: 'quick-start', title: 'Quick Start' },
      { file: 'configuration', title: 'Configuration' },
    ],
  },
  'core-concepts': {
    title: 'Core Concepts',
    files: [
      { file: 'core-concepts/nodes', title: '13 Primitive Nodes' },
      { file: 'core-concepts/dsl-syntax', title: 'DSL Syntax' },
      { file: 'core-concepts/control-flow', title: 'Control Flow' },
      { file: 'core-concepts/model-routing', title: 'Model Routing' },
      { file: 'core-concepts/mcp-tool-bus', title: 'MCP Tool Bus' },
      { file: 'core-concepts/rag-retrieval', title: 'RAG Retrieval' },
    ],
  },
  'web-studio': {
    title: 'Web Studio',
    files: [
      { file: 'web-studio/build-mode', title: 'Build Mode' },
      { file: 'web-studio/monitor-mode', title: 'Monitor Mode' },
      { file: 'web-studio/hitl-approvals', title: 'HITL Approvals' },
    ],
  },
  'api-reference': {
    title: 'API Reference',
    files: [
      { file: 'api-reference/rest', title: 'REST Endpoints' },
      { file: 'api-reference/websocket', title: 'WebSocket Events' },
      { file: 'api-reference/webhooks', title: 'Webhook Triggers' },
      { file: 'api-reference/error-codes', title: 'Error Codes' },
    ],
  },
};

const GROUP_KEYS = Object.keys(GROUP_ORDER);

/**
 * Build the ordered sidebar tree SYNCHRONOUSLY. Files are filtered against the
 * filesystem so missing docs do not appear in the nav, but ordering/titles are
 * deterministic. Uses existsSync (sync) so callers don't need to await.
 */
export function buildSidebarTree(
  root: string,
  version: string,
  locale: string,
): SidebarNode[] {
  const base = path.join(root, version, locale);
  const exists = (rel: string) => existsSync(path.join(base, `${rel}.mdx`));

  const out: SidebarNode[] = [];
  for (const key of GROUP_KEYS) {
    const group = GROUP_ORDER[key];
    const items: SidebarItem[] = [];
    for (const f of group.files) {
      if (exists(f.file)) {
        items.push({ title: f.title, slug: f.file });
      }
    }
    if (items.length > 0) out.push({ title: group.title, items });
  }
  return out;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

/** Extract h2/h3 headings as a table of contents. */
export function parseToc(md: string): TocItem[] {
  const lines = md.split('\n');
  const toc: TocItem[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (m) {
      const depth = m[1].length;
      const text = m[2].replace(/[#*`]/g, '').trim();
      toc.push({ depth, text, slug: slugifyHeading(text) });
    }
  }
  return toc;
}

export interface DocSiblings {
  previous?: SidebarItem;
  next?: SidebarItem;
}

export function findDocSiblings(tree: SidebarNode[], slug: string): DocSiblings {
  const flat = tree.flatMap((g) => g.items);
  const idx = flat.findIndex((i) => i.slug === slug);
  if (idx === -1) return {};
  return {
    previous: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}

export interface DocFile {
  raw: string;
  toc: TocItem[];
}

/** Read a doc MDX by version/locale/slug. Returns null if missing. */
export async function readDoc(
  root: string,
  version: string,
  locale: string,
  rest: string[],
): Promise<DocFile | null> {
  const file = path.join(root, version, locale, `${rest.join('/')}.mdx`);
  try {
    const raw = await fs.readFile(file, 'utf8');
    return { raw, toc: parseToc(raw) };
  } catch {
    return null;
  }
}
