// Directory data for the posts. Was blog.json; it is a .js file now so the
// author default can come from src/data/site.js instead of being retyped in
// each post's front matter (it was present on 7 of 16, and article.njk's
// citation box renders an empty author without it).
//
// `tags: ["post"]` deliberately stays in each post's front matter: Eleventy's
// data merge replaces arrays rather than concatenating, so a default here
// would be overwritten by a post's own `tags` and drop it from collections.post.
const site = require("../data/site");

module.exports = {
  layout: "article.njk",
  author: site.name,
};
