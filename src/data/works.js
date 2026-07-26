// The homepage "works" ledger. The list numbers (01–05) are not stored here —
// index.njk derives them from loop.index, so reordering does not mean
// renumbering by hand.
//
// The two external entries share their URLs with cv.projects via links.js;
// the names differ deliberately (lowercase here, formal in the CV).
const links = require("./links");

module.exports = [
  { name: "angular guide", url: links.angularGuide, tag: "angular · guide" },
  { name: "primordial soup", url: links.primordialSoup, tag: "essays" },
  { name: "blog", url: "/blog/", tag: "writing" },
  { name: "music", url: "/music/", tag: "audio" },
  { name: "cat gallery", url: "/cats/", tag: "photos" },
];
