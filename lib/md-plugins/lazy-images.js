// Rewrites every markdown body image.
//
// Remote images (imgur/ytimg/tumblr) only get loading="lazy" decoding="async" —
// they aren't ours to re-encode, and their dimensions aren't knowable without a
// network round trip at build time. Deferring them keeps off-screen figures
// from contending with above-the-fold work.
//
// Self-hosted images additionally get intrinsic dimensions, so they stop
// shifting layout as they decode: rasters go through the AVIF/WebP pipeline in
// lib/images.js and come back as a <picture>, SVGs keep their single file and
// just gain width/height read off the source. Author-supplied attributes always
// win — we only fill in what's missing.
const images = require("../images.js");

function lazyImagesPlugin(md) {
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));

  md.renderer.rules.image = function (tokens, idx, opts, env, self) {
    const token = tokens[idx];
    if (token.attrIndex("loading") < 0) token.attrPush(["loading", "lazy"]);
    if (token.attrIndex("decoding") < 0) token.attrPush(["decoding", "async"]);

    const src = token.attrGet("src");

    if (images.isLocal(src) && images.isSvg(src)) {
      const size = images.svgSize(src);
      if (size) {
        if (token.attrIndex("width") < 0)
          token.attrPush(["width", String(size.width)]);
        if (token.attrIndex("height") < 0)
          token.attrPush(["height", String(size.height)]);
      }
    }

    if (images.isLocal(src) && images.isRaster(src)) {
      // markdown-it keeps alt text in the token's children, not in its attrs.
      const attrs = { alt: token.content || "" };
      for (const [name, value] of token.attrs || []) {
        if (name !== "src" && name !== "alt") attrs[name] = value;
      }
      // <picture> is phrasing content, so this stays valid inside the <p>
      // markdown-it wraps a standalone image in.
      const picture = images.picture(src, attrs);
      if (picture) return picture;
    }

    return defaultRender(tokens, idx, opts, env, self);
  };
}

module.exports = lazyImagesPlugin;
