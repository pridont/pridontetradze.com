// Gives a fence a filename header bar:
//
//   ```ts dynamic-host.ts
//
// renders as a bordered block whose head carries the name, with the <pre>
// below it. The second word of the info string is the filename; a fence with
// only a language is left exactly as it was.
//
// Markdown-it's own fence renderer already reads the language off word 0 of
// `info` and ignores the rest, so nothing has to be re-parsed for highlighting
// to keep working — this only wraps the finished output.
//
// Order matters at registration: markdown-it-highlightjs wraps
// `renderer.rules.fence` itself to add the hljs class. Registering this plugin
// before it would put our wrapper on the inside and lose that class, so
// .eleventy.js calls md.use() for this one *after* the highlighter.

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function codeTitlePlugin(md) {
  const defaultRender =
    md.renderer.rules.fence ||
    ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));

  md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
    const rendered = defaultRender(tokens, idx, opts, env, self);

    // [language, filename]. Anything past the filename is ignored rather than
    // joined: a name with a space in it can't survive the info string anyway,
    // and silently gluing trailing words on would hide the mistake.
    const name = String(tokens[idx].info || "").trim().split(/\s+/)[1];
    if (!name) return rendered;

    return (
      '<div class="code-block">' +
      `<div class="code-block__name">${escapeHtml(name)}</div>` +
      rendered +
      "</div>\n"
    );
  };
}

module.exports = codeTitlePlugin;
