// One nav list for both the desktop header and the mobile menu. They used to
// be two hand-maintained lists in header.njk and had already drifted — desktop
// showed three links, mobile five.
//
// `primary` marks the desktop subset. `num` is the mobile menu's ordinal.
// `match` drives aria-current via the `navCurrent` filter: a plain string is a
// substring test against page.url, "exact:" requires the whole URL to match
// (otherwise "/" would light up on every page).
module.exports = [
  { href: "/", label: "home", num: "00", primary: true, match: ["exact:/"] },
  { href: "/about/", label: "about", num: "01", primary: true, match: ["/about"] },
  { href: "/blog/", label: "blog", num: "02", primary: true, match: ["/blog", "/tags"] },
  { href: "/cats/", label: "cats", num: "03", primary: false, match: ["/cats"] },
  { href: "/music/", label: "music", num: "04", primary: false, match: ["/music"] },
];
