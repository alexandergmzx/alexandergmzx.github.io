(() => {
  const frame = document.getElementById("delta-sim");
  if (!(frame instanceof HTMLIFrameElement)) return;

  // This page heading sits inside the site's main landmark; only the site-wide
  // navigation header should be announced as a banner. Keep the h1 semantics.
  frame.closest(".post")?.querySelector(".post-header")?.setAttribute("role", "presentation");

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== "delta-sim:resize" || typeof data.height !== "number" || !Number.isFinite(data.height) || data.height <= 0) return;
    const height = `${Math.ceil(data.height) + 2}px`;
    if (frame.style.height !== height) frame.style.height = height;
  });

  // Request a measurement as well as listening for spontaneous resize events, so a
  // cached iframe that mounted before this script also receives the correct height.
  const measure = () => frame.contentWindow?.postMessage({ type: "delta-sim:measure" }, window.location.origin);
  frame.addEventListener("load", measure);
  measure();
})();
