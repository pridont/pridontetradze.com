// Adds loading="lazy" decoding="async" to every markdown body image. Inline
// post images are mostly remote (imgur/ytimg); deferring them keeps off-screen
// figures from contending with above-the-fold work. Author-supplied attributes
// win — we only fill in what's missing.
function lazyImagesPlugin(md) {
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));

  md.renderer.rules.image = function (tokens, idx, opts, env, self) {
    const token = tokens[idx];
    if (token.attrIndex("loading") < 0) token.attrPush(["loading", "lazy"]);
    if (token.attrIndex("decoding") < 0) token.attrPush(["decoding", "async"]);
    return defaultRender(tokens, idx, opts, env, self);
  };
}

module.exports = lazyImagesPlugin;
