// User-agent lists for robots.njk. Two flat arrays instead of 80 lines of
// hand-repeated "User-agent: / Disallow:" stanzas.
//
// blocked  AI *training* crawlers — they collect corpora for model training.
// allowed  AI *search* and user-initiated fetches — they retrieve a page to
//          answer a question and cite it. Listed explicitly so they are never
//          caught by a future blanket rule.
module.exports = {
  blocked: [
    "GPTBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Meta-ExternalAgent",
    "FacebookBot",
    "Bytespider",
    "Amazonbot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "AI2Bot",
    "Diffbot",
    "omgili",
    "omgilibot",
    "PanguBot",
    "Timpibot",
    "ImagesiftBot",
    "Scrapy",
  ],
  allowed: [
    "OAI-SearchBot",
    "ChatGPT-User",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
  ],
};
