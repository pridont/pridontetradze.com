// The two page background colours, for the `theme-color` meta and the
// pre-paint script in head.njk (both are inline in the template, so they can
// interpolate build data).
//
// These values are mirrored — unavoidably — in three files that cannot read
// Eleventy globals. Change one, change all four:
//   src/styles/tokens.css:16,22        the actual --ink-bg / --paper-bg tokens
//   src/styles/palette-lab.css:71,76   lab overrides
//   src/scripts/theme/index.js:24-25   fallbacks, bundled by esbuild
module.exports = {
  dark: "#17131c",
  light: "#f1ecf1",
};
