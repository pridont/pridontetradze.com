// Display order for the tag pills in tags-list.njk.
//
// The pill *set* is not stored here — it comes from the `tagList` collection
// (.eleventy.js), so a new tag on a post shows up without editing this file.
// This only fixes the order, which is editorial rather than alphabetical.
// Tags missing from this list still render, after the ones listed.
//
// Named `categories` and not `tags` on purpose: a global called `tags` would
// shadow the page-level `tags` that base.njk and article.njk read from post
// front matter, and would be truthy on every page that has no tags of its own.
module.exports = {
  order: ["tech", "academic", "personal", "logos"],
};
