module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  // The Super Spectral bundle is not this site's content and must not be read
  // as if it were. Its HTML was already skipped; its ~150 KB of MINIFIED
  // JavaScript was not, so every identifier-looking substring in it — every
  // mangled variable, every string literal — was being treated as a selector
  // this site's stylesheets must keep. That silently weakens the purge for the
  // whole site, and it grows every time that bundle does. The analyzer ships
  // its own stylesheet inside its own iframe and shares none of ours.
  skippedContentGlobs: ["_site/assets/**/*.html", "_site/assets/superspectral/**/*.js"],
  // Garden classes that only appear inside note bodies (`{: .poem}`, the
  // YouTube include) or on pages that exist only once notes do. Without this,
  // a deploy made while the garden is empty — or holding no poems — ships a
  // stylesheet with those rules stripped out.
  safelist: {
    standard: [/^garden-/, /^maturity/, "poem", "youtube-embed", /^comments-toggle/],
  },
};
