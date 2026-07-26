// Applies tabindex="-1" to all li elements with bib- ids
function bibListPlugin(md, options = {}) {
  const originalRender = md.render;

  md.render = function (src, env) {
    const html = originalRender.call(this, src, env);

    if (!html.includes('<div class="bibliography">')) {
      return html;
    }

    const modifiedHtml = html.replace(
      /<li\s+([^>]*id="bib-[^"]*"[^>]*)>/g,
      (match, attrs) => {
        // Check if tabindex is already present
        if (attrs.includes("tabindex=")) {
          return match;
        }
        return `<li ${attrs} tabindex="-1">`;
      }
    );

    return modifiedHtml;
  };
}

module.exports = bibListPlugin;
