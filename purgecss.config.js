module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // Garden classes that only appear inside note bodies (`{: .poem}`, the
  // YouTube include) or on pages that exist only once notes do. Without this,
  // a deploy made while the garden is empty — or holding no poems — ships a
  // stylesheet with those rules stripped out.
  safelist: {
    standard: [/^garden-/, /^maturity/, "poem", "youtube-embed", /^comments-toggle/],
  },
};
