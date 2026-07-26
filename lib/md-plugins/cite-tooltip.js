// Gives every inline citation a native browser tooltip carrying the full
// reference, exactly as it reads in the bibliography at the foot of the post.
//
// markdown-it-biblatex renders the two halves separately and links them only
// by fragment:
//
//   <a href="#bib-1-17"><span class="citation">(Imedadze, 2022)</span></a>
//   ...
//   <li id="bib-1-17" class="csl-entry">Imedadze, I. (2022). TBILISI ...</li>
//
// so following a citation means jumping to the end of the article and back.
// This runs after render, indexes the <li> entries by id, and copies each one
// into a title= on the matching anchor. No JS, no CSS — the browser's own
// tooltip, which also means it works on a focused link via the keyboard.

// Entities the CSL renderer emits (numeric for &, curly quotes and dashes from
// the .bib source). They have to come back to plain text before being escaped
// again for an attribute, or the tooltip shows the raw "&#38;".
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(html) {
  return html
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

function attrEscape(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// "<i>Journal</i>, <i>47</i>(3), 3–30." -> "Journal, 47(3), 3–30."
function toPlainText(inner) {
  return decode(inner.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function citeTooltipPlugin(md) {
  const originalRender = md.render;

  md.render = function (src, env) {
    const html = originalRender.call(this, src, env);

    if (!html.includes('<div class="bibliography">')) {
      return html;
    }

    const references = new Map();
    const entry = /<li\s+[^>]*id="(bib-[^"]+)"[^>]*>([\s\S]*?)<\/li>/g;
    for (const [, id, inner] of html.matchAll(entry)) {
      const text = toPlainText(inner);
      if (text) references.set(id, text);
    }

    if (!references.size) {
      return html;
    }

    // Only anchors that point at an entry we actually indexed, and only those
    // without a title already — a hand-written one in the source wins.
    return html.replace(
      /<a\s+([^>]*href="#(bib-[^"]+)"[^>]*)>/g,
      (match, attrs, id) => {
        const reference = references.get(id);
        if (!reference || /\btitle=/.test(attrs)) return match;
        return `<a ${attrs} title="${attrEscape(reference)}">`;
      },
    );
  };
}

module.exports = citeTooltipPlugin;
