function linksPlugin(md, options = {}) {

  const proxy = (tokens, idx, opts, env, self) => {
    return self.renderToken(tokens, idx, opts);
  };
  const defaultRender = md.renderer.rules.link_open || proxy;

  const externalPattern = options.externalPattern || /^https/;

  md.renderer.rules.link_open = function (tokens, idx, opts, env, self) {
    const token = tokens[idx];
    const hrefAttr = token.attrGet("href");

    if (hrefAttr && externalPattern.test(hrefAttr)) {
      token.attrJoin("class", "external");
      token.attrJoin("target", "_blank");
    }

    return defaultRender(tokens, idx, opts, env, self);
  };
}

module.exports = linksPlugin;
