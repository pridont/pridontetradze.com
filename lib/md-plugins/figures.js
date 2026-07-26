// Turns a captioned image into a numbered <figure>.
//
// The caption is the rest of the image's own paragraph — image on one line,
// caption on the next, no blank line between:
//
//   ![Structure of set activity](/assets/images/set-chart.svg)
//   Structure of the first level of psychic activity [@nadirashvili83].
//
// Keeping the caption as inline markdown (rather than, say, the image's title
// attribute) is the whole point: captions carry citations, emphasis and links,
// and a title= is plain text only.
//
// An image alone in its paragraph stays a bare <img> — a figure here is an
// editorial claim ("fig. 3"), not something to be conferred on every image.
// Put a blank line between the image and the sentence under it and nothing
// changes.
//
// This runs on the token stream, so the image itself still goes through the
// renderer in lazy-images.js and self-hosted rasters come back as a <picture>
// with intrinsic dimensions.

function figuresPlugin(md) {
  md.core.ruler.after("inline", "figures", (state) => {
    const tokens = state.tokens;

    const html = (content) => {
      const token = new state.Token("html_block", "", 0);
      token.block = true;
      token.content = content;
      return token;
    };

    const inlineOf = (children) => {
      const token = new state.Token("inline", "", 0);
      token.children = children;
      token.content = "";
      return token;
    };

    const out = [];
    let figure = 0;

    for (let i = 0; i < tokens.length; i++) {
      const inline = tokens[i + 1];
      const isCandidate =
        tokens[i].type === "paragraph_open" &&
        inline &&
        inline.type === "inline" &&
        tokens[i + 2] &&
        tokens[i + 2].type === "paragraph_close";

      const children = (isCandidate && inline.children) || [];
      const caption = children.slice(2);
      const hasCaption =
        children[0] &&
        children[0].type === "image" &&
        children[1] &&
        children[1].type === "softbreak" &&
        // A second image means a multi-image paragraph, not a caption.
        !caption.some((child) => child.type === "image") &&
        caption.some((child) => (child.content || "").trim() !== "");

      if (!hasCaption) {
        out.push(tokens[i]);
        continue;
      }

      figure += 1;
      out.push(
        html('<figure class="figure">\n'),
        inlineOf([children[0]]),
        html(
          `<figcaption><span class="figure__num">fig. ${figure}</span><span>`,
        ),
        inlineOf(caption),
        html("</span></figcaption>\n</figure>\n"),
      );
      i += 2;
    }

    state.tokens = out;
  });
}

module.exports = figuresPlugin;
