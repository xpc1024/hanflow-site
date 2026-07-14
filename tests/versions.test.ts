import { describe, expect, it } from 'vitest';
import {
  VERSIONS,
  LATEST_VERSION,
  isKnownVersion,
  resolveVersion,
  stripVersionPrefix,
  versionedPath,
} from '../lib/versions';

describe('versions', () => {
  it('exposes the latest version as 1.0.1 (matches hanflow source)', () => {
    expect(LATEST_VERSION).toBe('1.0.1');
    expect(VERSIONS[VERSIONS.length - 1]).toBe(LATEST_VERSION);
  });

  it('detects known version strings', () => {
    expect(isKnownVersion('1.0.1')).toBe(true);
    expect(isKnownVersion('9.9.9')).toBe(false);
  });

  it('resolves latest when first slug segment is not a version', () => {
    expect(resolveVersion(['quick-start'])).toEqual({
      version: '1.0.1',
      isLatest: true,
      rest: ['quick-start'],
    });
    expect(resolveVersion(['core-concepts', 'nodes'])).toEqual({
      version: '1.0.1',
      isLatest: true,
      rest: ['core-concepts', 'nodes'],
    });
  });

  it('resolves old version when first slug segment is a known version', () => {
    expect(resolveVersion(['0.0.9', 'quick-start'])).toEqual({
      version: '0.0.9',
      isLatest: false,
      rest: ['quick-start'],
    });
  });

  it('strips a version prefix if present, else returns slug unchanged', () => {
    expect(stripVersionPrefix(['1.0.1', 'quick-start'])).toEqual(['quick-start']);
    expect(stripVersionPrefix(['quick-start'])).toEqual(['quick-start']);
  });

  it('builds a versioned path with no prefix for latest', () => {
    expect(versionedPath('quick-start', '1.0.1')).toBe('quick-start');
  });

  it('builds a versioned path with prefix for old versions', () => {
    expect(versionedPath('quick-start', '0.0.9')).toBe('0.0.9/quick-start');
  });
});
