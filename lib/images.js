// Responsive image pipeline for self-hosted assets.
//
// Every image under src/assets/ is pre-generated into public/img/ as AVIF +
// WebP at a handful of widths, with content-hashed filenames. Because the
// files are written up front (see generateAll, wired to eleventy.before), every
// consumer downstream can use eleventy-img's *synchronous* stats API — which
// matters for the markdown renderer, whose rules cannot be async.
//
// Remote images (imgur, ytimg, angular.dev) are left alone: they are not ours
// to re-encode, and fetching them at build time would make the build depend on
// third-party uptime.

const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

const SRC_ROOT = path.join(__dirname, "..", "src");
const IMAGE_DIR = path.join(SRC_ROOT, "assets", "images");

// 1200 is above the widest source we ship; eleventy-img never upscales, so it
// simply drops out for smaller originals. `null` keeps the original width.
// AVIF + WebP only — the site already served .webp covers directly, so WebP is
// a safe <img> fallback and skipping JPEG cuts encode time by a third.
//
// Quality is set explicitly because most sources are *already* lossy .webp.
// Sharp's defaults (webp 80, avif 50 at a higher effort) re-encode those into
// files bigger than the originals — the full-width variant of the 88KB cover
// came back at 91KB. These values keep every variant below its source while
// staying above the point where double-compression starts showing.
const OPTIONS = {
  widths: [400, 800, 1200, null],
  formats: ["avif", "webp"],
  outputDir: "./public/img/",
  urlPath: "/img/",
  sharpWebpOptions: { quality: 72 },
  sharpAvifOptions: { quality: 50 },
};

const RASTER = /\.(jpe?g|png|webp)$/i;

// Article covers sit in .section__body, which is capped at 44rem (704px) once
// the two-column ledger kicks in at 901px and spans the viewport below that —
// see main.css:579 and article.css:108. Kept here rather than in the templates
// because both the <picture> markup and its preload link need the same value,
// and they live in different files.
const COVER_SIZES = "(max-width: 900px) 100vw, 704px";

const isLocal = (src) => typeof src === "string" && src.startsWith("/assets/");
const isRaster = (src) => RASTER.test(src);
const isSvg = (src) => /\.svg$/i.test(String(src));

// "/assets/images/x.webp" -> "<repo>/src/assets/images/x.webp"
const sourcePath = (src) => path.join(SRC_ROOT, src);

/** Every raster under src/assets/images, as site-absolute URLs. */
function localRasters() {
  return fs
    .readdirSync(IMAGE_DIR)
    .filter((f) => RASTER.test(f))
    .map((f) => `/assets/images/${f}`);
}

/**
 * Write every variant to public/img/. Runs once per build, before any template
 * renders, so the sync helpers below never race the async writes. eleventy-img
 * skips files that already exist, so watch rebuilds are close to free.
 */
async function generateAll() {
  for (const src of localRasters()) {
    await Image(sourcePath(src), OPTIONS);
  }
}

/** eleventy-img metadata for a local raster, or null for anything else. */
function statsFor(src) {
  if (!isLocal(src) || !isRaster(src)) return null;
  try {
    return Image.statsSync(sourcePath(src), OPTIONS);
  } catch (e) {
    return null;
  }
}

/**
 * <picture> markup with AVIF + WebP sources and intrinsic width/height on the
 * <img>. Returns null when src isn't a local raster, so callers can fall back
 * to a plain tag.
 */
function picture(src, attrs) {
  const stats = statsFor(src);
  if (!stats) return null;
  return Image.generateHTML(stats, {
    ...attrs,
    sizes: attrs.sizes || COVER_SIZES,
  });
}

/**
 * Intrinsic dimensions of a local SVG, read from its width/height attributes or
 * failing that its viewBox. SVGs skip the raster pipeline — there is nothing to
 * re-encode — but they still need dimensions to avoid shifting layout.
 */
function svgSize(src) {
  if (!isLocal(src) || !isSvg(src)) return null;
  try {
    const head = fs.readFileSync(sourcePath(src), "utf-8").slice(0, 1024);
    const w = head.match(/\bwidth="([\d.]+)"/);
    const h = head.match(/\bheight="([\d.]+)"/);
    if (w && h) return { width: Math.round(+w[1]), height: Math.round(+h[1]) };
    const box = head.match(/\bviewBox="[\d.\s-]*?([\d.]+)[\s,]+([\d.]+)"/);
    if (box) return { width: Math.round(+box[1]), height: Math.round(+box[2]) };
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * A <link rel="preload"> for the AVIF variants of a local raster, so the LCP
 * image starts downloading from the <head> instead of waiting for the parser to
 * reach it. AVIF only, deliberately: two preloads with different `type` would
 * both fire in a browser that supports both formats, doubling the bytes.
 * Browsers without AVIF support simply skip it and discover the image normally.
 */
function preloadLink(src, sizes) {
  const stats = statsFor(src);
  const avif = stats && stats.avif;
  if (!avif || !avif.length) return "";
  const srcset = avif.map((v) => `${v.url} ${v.width}w`).join(", ");
  return (
    `<link rel="preload" as="image" type="image/avif" fetchpriority="high" ` +
    `imagesrcset="${srcset}" imagesizes="${sizes || COVER_SIZES}">`
  );
}

module.exports = {
  COVER_SIZES,
  OPTIONS,
  generateAll,
  isLocal,
  isRaster,
  isSvg,
  picture,
  preloadLink,
  statsFor,
  svgSize,
};
