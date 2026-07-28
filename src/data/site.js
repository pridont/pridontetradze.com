// Site identity — the single source for anything that names, addresses or
// describes this site. Everything here was previously re-typed across
// head.njk, feed.njk, header.njk, footer.njk, article.njk, tags.njk and
// cv.json; those now read from this file.
//
// Keep the Georgian motto in this file rather than somewhere outside src/:
// data/fonts.js walks src/ for Georgian codepoints to build the Noto Sans
// Georgian &text= subset, and a motto it cannot see would fall back to a
// system font.

const domain = "tetradze.com";
const url = `https://${domain}`;

module.exports = {
  name: "Pridon Tetradze",
  role: "Software Developer",
  wordmark: "Pridon's corner",
  domain,
  url,
  language: "en",
  defaultImage: "/assets/images/cover.jpg",
  description:
    "Pridon Tetradze — Software developer. Writing on code, the mind, and the space in between.",

  feed: {
    subtitle: "Blog",
    path: "/feed.xml",
  },

  // Mkhedruli in the mobile menu, Mtavruli (all-caps) in the site footer.
  motto: {
    mkhedruli: "უფალო შეგვიწყალენ",
    mtavruli: "ᲣᲤᲐᲚᲝ ᲨᲔᲒᲕᲘᲬႸᲐᲚᲔᲜ",
  },

  contact: {
    email: "pridon@tetradze.ge",
    github: "https://github.com/pridont",
    linkedin: "https://www.linkedin.com/in/pridon-tetradze",
    website: url,
  },
};
