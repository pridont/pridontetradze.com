// Google Fonts request URLs, assembled once per build.
//
// Two requests rather than one, because only the Georgian family can be
// usefully subset:
//
//   latin    Hanken Grotesk + DM Mono. All four Hanken weights resolve to a
//            single variable file, so listing them costs nothing; both DM Mono
//            weights are genuinely used (400 and 500 both appear across
//            main.css and elements/*.css).
//
//   georgian Noto Sans Georgian, requested with &text= carrying exactly the
//            Georgian glyphs this site uses. The full Georgian block is 41.5KB
//            and was downloading on every page for the ~20-glyph motto in
//            header.njk/footer.njk plus the "ქა" badge. The subset is 15.7KB.
//
// The glyph set is scanned from source rather than hardcoded so a new Georgian
// post cannot silently fall back to a system font — a character that appears
// anywhere in src/ is in the request. It is sorted and deduped, which keeps the
// URL byte-identical across pages: one shared file, cached once for the whole
// site, instead of a different subset per page.

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..");
const SCANNED = /\.(md|njk|json|js)$/;

// Mkhedruli + Asomtavruli (U+10A0–10FF), Mtavruli (U+1C90–1CBF) and the
// Nuskhuri supplement (U+2D00–2D2F).
const GEORGIAN = /[Ⴀ-ჿᲐ-Ჿⴀ-⴯]/g;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets") continue;
      walk(full, out);
    } else if (SCANNED.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function georgianGlyphs() {
  const seen = new Set();
  for (const file of walk(SRC)) {
    const matches = fs.readFileSync(file, "utf-8").match(GEORGIAN);
    if (matches) for (const ch of matches) seen.add(ch);
  }
  return [...seen].sort().join("");
}

const BASE = "https://fonts.googleapis.com/css2";
const glyphs = georgianGlyphs();

module.exports = {
  latin:
    `${BASE}?family=Hanken+Grotesk:wght@400;500;600;700` +
    `&family=DM+Mono:wght@400;500&display=swap`,
  // No glyphs anywhere in src/ means no request at all.
  georgian: glyphs
    ? `${BASE}?family=Noto+Sans+Georgian:wght@400;500;600;700` +
      `&display=swap&text=${encodeURIComponent(glyphs)}`
    : null,
};
