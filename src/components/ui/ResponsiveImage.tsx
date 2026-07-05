import Image, { type ImageProps } from "next/image";

/** Derive the mobile asset path: foo.webp -> foo-mobile.webp (preserves any query string). */
function toMobileSrc(src: string) {
  return src.replace(/(\.webp)(\?.*)?$/i, "-mobile$1$2");
}

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  /** Max viewport width (px) at which the smaller -mobile asset is served. Default 768. */
  mobileBreakpoint?: number;
}

/**
 * Art-directed image:
 *  - On phones (<= mobileBreakpoint) the browser loads the pre-built `-mobile.webp`.
 *  - On larger screens it falls through to next/image, keeping its responsive
 *    optimization (per-width variants, AVIF) for desktop.
 *
 * Drop-in replacement for <Image> — accepts the same props (fill, sizes,
 * className, priority, ...). Requires a matching `<name>-mobile.webp` sibling.
 */
export function ResponsiveImage({
  src,
  mobileBreakpoint = 768,
  ...rest
}: ResponsiveImageProps) {
  return (
    <picture>
      <source
        media={`(max-width: ${mobileBreakpoint}px)`}
        srcSet={toMobileSrc(src)}
        type="image/webp"
      />
      <Image src={src} {...rest} />
    </picture>
  );
}
