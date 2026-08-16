// Emits a plain-markdown twin of every post at /blog/<slug>.md, so readers and
// LLM clients can fetch the source instead of scraping the rendered article.
// Plain static files: the site stays pure Cloudflare Workers Static Assets,
// with no Worker script and so no per-request invocation cost.
//
// This is a .11ty.js template on purpose, not a .njk one. Three posts quote
// Nunjucks and Angular syntax inside fenced code blocks — blog-with-11ty.md has
// a literal `{% include "header.njk" %}` — and a Nunjucks template would try to
// execute those and fail the build. A JS template hands the body back as an
// opaque string, and sidesteps autoescaping mangling `<` along the way.
const fs = require("fs");
const site = require("./data/site");

// Everything between the opening and closing `---` of the source file. Eleventy
// 2 has no `page.rawInput` (that arrived in 3.x) and gray-matter is not hoisted
// under pnpm, so the body is read off disk and the front matter cut here.
const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

// Root-relative markdown links only — `](/assets/…)` becomes absolute so the
// file still resolves once it is read away from the site. Raw HTML embedded in
// a post keeps its relative src; rewriting that is not worth the false hits.
// Drop this line to keep bodies byte-identical to the source.
const ROOT_RELATIVE_LINK = /\]\(\/(?!\/)/g;

// YAML-safe double-quoted scalar: only `\` and `"` need escaping inside one.
const quote = (value) => `"${String(value).replace(/([\\"])/g, "\\$1")}"`;

module.exports = {
  data() {
    return {
      pagination: { data: "collections.post", size: 1, alias: "post" },
      permalink: (data) => `${data.post.url.replace(/\/$/, "")}.md`,
      // sitemap.njk walks collections.all; without this every .md twin would be
      // listed there alongside the article it duplicates.
      eleventyExcludeFromCollections: true,
    };
  },

  render({ post }) {
    const body = fs
      .readFileSync(post.inputPath, "utf8")
      .replace(FRONT_MATTER, "")
      .replace(ROOT_RELATIVE_LINK, `](${site.url}/`)
      .trim();

    // A normalized front matter block rather than the original: Eleventy-only
    // keys (layout, templateEngineOverride) mean nothing to a reader, and
    // `source` gives the file a way back to the canonical article.
    const { title, description, author, tags = [] } = post.data;
    const topics = tags.filter((tag) => tag !== "post");

    const frontMatter = [
      `title: ${quote(title)}`,
      `date: ${post.date.toISOString().slice(0, 10)}`,
      description && `description: ${quote(description)}`,
      topics.length && `tags: [${topics.join(", ")}]`,
      author && `author: ${quote(author)}`,
      `source: ${site.url}${post.url}`,
    ].filter(Boolean);

    return `---\n${frontMatter.join("\n")}\n---\n\n${body}\n`;
  },
};
