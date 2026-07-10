import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export function MDXRenderer({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-pre:rounded-code prose-pre:border prose-pre:border-edge prose-a:text-accent prose-code:before:hidden prose-code:after:hidden">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeShiki, { themes: { dark: 'github-dark', light: 'github-light' } }],
            ],
          },
        }}
      />
    </div>
  );
}
