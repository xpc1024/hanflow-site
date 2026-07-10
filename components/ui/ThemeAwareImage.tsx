import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Real <img>-backed placeholder (design 8.11: no div-fake screenshots).
 * Replace src with an actual canvas screenshot once captured.
 */
export function ThemeAwareImage({ src, alt, width = 1200, height = 750, className }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
