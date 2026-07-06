import Image, { type ImageProps } from "next/image";

/** Matches a supported raster extension (with any trailing query string). */
const MOBILE_EXT_RE = /(\.(?:webp|jpe?g))(\?.*)?$/i;

/** Derive the mobile asset path: foo.webp -> foo-mobile.webp, foo.jpg -> foo-mobile.jpg (preserves any query string). */
function toMobileSrc(src: string) {
  return src.replace(MOBILE_EXT_RE, "-mobile$1$2");
}

/** MIME type for the <source>, matching the asset's extension. */
function mobileType(src: string) {
  return /\.webp(\?.*)?$/i.test(src) ? "image/webp" : "image/jpeg";
}

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  /** Max viewport width (px) at which the smaller -mobile asset is served. Default 768. */
  mobileBreakpoint?: number;
}

/**
 * Art-directed image:
 *  - On phones (<= mobileBreakpoint) the browser loads the pre-built
 *    `-mobile` sibling (`-mobile.webp` for webp sources, `-mobile.jpg` for jpg).
 *  - On larger screens it falls through to next/image, keeping its responsive
 *    optimization (per-width variants, AVIF) for desktop.
 *
 * Drop-in replacement for <Image> — accepts the same props (fill, sizes,
 * className, priority, ...). Requires a matching `<name>-mobile.<ext>` sibling
 * for webp/jpg sources; other extensions just render the desktop asset.
 */
export function ResponsiveImage({
  src,
  mobileBreakpoint = 768,
  ...rest
}: ResponsiveImageProps) {
  const hasMobile = MOBILE_EXT_RE.test(src);
  return (
    <picture>
      {hasMobile && (
        <source
          media={`(max-width: ${mobileBreakpoint}px)`}
          srcSet={toMobileSrc(src)}
          type={mobileType(src)}
        />
      )}
      <Image src={src} {...rest} />
    </picture>
  );
}
