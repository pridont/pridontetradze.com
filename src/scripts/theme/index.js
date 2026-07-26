/**
 * Color theme toggle.
 * Dark ("ink") is the default; `html.light` switches to "paper". The class
 * lives on <html> (not <body>) so an inline <head> script can set it before
 * the first paint — see head.njk — which avoids a flash of the wrong theme.
 * The sun/moon icons are swapped purely with CSS (see main.css), so this
 * only toggles the class, persists the choice, and syncs the theme-color meta.
 */
export function themeSwitch() {
  const buttons = document.querySelectorAll(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Both colours are read once, up front, and cached. Reading them inside
  // apply() meant a getComputedStyle immediately after the class toggle had
  // invalidated style — a read-after-write that forces a synchronous style
  // recalc on load and on every toggle (Lighthouse flags it as a forced
  // reflow). Here nothing has been invalidated yet, so the read is free.
  //
  // --ink-bg and --paper-bg both live unconditionally on :root (tokens.css),
  // not inside the .light block, so one read gets both regardless of the
  // theme currently applied.
  const rootStyle = getComputedStyle(document.documentElement);
  const colors = {
    light: rootStyle.getPropertyValue("--paper-bg").trim() || "#f1ecf1",
    dark: rootStyle.getPropertyValue("--ink-bg").trim() || "#17131c",
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");
  apply(saved || (prefersDark ? "dark" : "light"));

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const next = document.documentElement.classList.contains("light")
        ? "dark"
        : "light";
      apply(next);
      localStorage.setItem("theme", next);
    }),
  );

  function apply(theme) {
    const isLight = theme === "light";
    document.documentElement.classList.toggle("light", isLight);
    if (themeMeta) {
      themeMeta.setAttribute("content", isLight ? colors.light : colors.dark);
    }
  }
}
