import { describe, expect, it, beforeAll } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  buildSidebarTree,
  parseToc,
  slugifyHeading,
  findDocSiblings,
  type SidebarNode,
} from '../lib/docs';

const FIXTURE = path.resolve('tests/__fixtures__/content');

beforeAll(async () => {
  // Minimal bilingual tree used to assert tree + sibling logic.
  await fs.mkdir(path.join(FIXTURE, '0.1.0/en/core-concepts'), { recursive: true });
  await fs.mkdir(path.join(FIXTURE, '0.1.0/zh/core-concepts'), { recursive: true });
  await fs.writeFile(path.join(FIXTURE, '0.1.0/en/quick-start.mdx'), '# Quick Start\n');
  await fs.writeFile(path.join(FIXTURE, '0.1.0/en/configuration.mdx'), '# Configuration\n');
  await fs.writeFile(path.join(FIXTURE, '0.1.0/en/core-concepts/nodes.mdx'), '# Nodes\n');
  await fs.writeFile(path.join(FIXTURE, '0.1.0/en/core-concepts/dsl.mdx'), '# DSL\n');
});

describe('docs sidebar tree', () => {
  it('groups files into ordered groups by directory', () => {
    const tree = buildSidebarTree(FIXTURE, '0.1.0', 'en');
    const groups = tree.map((g) => g.title);
    expect(groups).toContain('Getting Started');
    expect(groups).toContain('Core Concepts');
  });

  it('maps files to slugs without extension and without version/locale', () => {
    const tree = buildSidebarTree(FIXTURE, '0.1.0', 'en');
    const gettingStarted = tree.find((g) => g.title === 'Getting Started') as SidebarNode;
    const slugs = gettingStarted.items.map((i) => i.slug);
    expect(slugs).toContain('quick-start');
    expect(slugs).toContain('configuration');
  });
});

describe('toc parsing', () => {
  it('slugifies headings to anchor ids', () => {
    expect(slugifyHeading('Quick Start')).toBe('quick-start');
    expect(slugifyHeading('Model Routing & Privacy')).toBe('model-routing-privacy');
  });

  it('extracts h2/h3 with depth and slug', () => {
    const md = '# Title\n\n## First Section\n\ntext\n\n### Sub\n\n## Second\n';
    const toc = parseToc(md);
    expect(toc).toEqual([
      { depth: 2, text: 'First Section', slug: 'first-section' },
      { depth: 3, text: 'Sub', slug: 'sub' },
      { depth: 2, text: 'Second', slug: 'second' },
    ]);
  });
});

describe('prev/next siblings', () => {
  it('returns previous and next across the flat ordered list', () => {
    const tree = buildSidebarTree(FIXTURE, '0.1.0', 'en');
    const { previous, next } = findDocSiblings(tree, 'configuration');
    expect(previous?.slug).toBe('quick-start');
    expect(next?.slug).toBe('core-concepts/nodes');
  });

  it('returns undefined at the ends', () => {
    const tree = buildSidebarTree(FIXTURE, '0.1.0', 'en');
    expect(findDocSiblings(tree, 'quick-start').previous).toBeUndefined();
    expect(findDocSiblings(tree, 'core-concepts/dsl').next).toBeUndefined();
  });
});
