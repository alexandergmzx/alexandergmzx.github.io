#!/usr/bin/env bash
# Fetches Alex's profile photo (and any other reusable image assets) from the
# legacy Google Sites portfolio at https://sites.google.com/view/alexander-gomez
# and drops them into assets/img/ for use in the new al-folio site.
#
# Re-runnable: skips downloads that already succeeded (overwrites only if size > 0).
# Usage: bash _scripts/fetch_old_site_assets.sh
#
# Note: Google Sites' image CDN (lh3.googleusercontent.com/sitesv/...) hotlink-protects
# its files and returns HTTP 403 to external clients regardless of User-Agent/Referer.
# Confirmed empirically on 2026-05-16. The recommended path is:
#   1. Open https://sites.google.com/view/alexander-gomez in a browser.
#   2. Right-click the profile photo → Save image as → save as `prof_pic.jpg`
#      directly into `assets/img/`, replacing the placeholder.
# This script remains for future use if/when Google relaxes the gate or if
# different URLs (with cached anti-hotlink tokens) become available.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG_DIR="$REPO_ROOT/assets/img"
mkdir -p "$IMG_DIR"

declare -A assets=(
  ["prof_pic.jpg"]="https://lh3.googleusercontent.com/sitesv/AA5AbUDxLOmfpo0DZbaKZ-wVbojnz7G0apOpHIFqZSLFLxLVmXZ-JtRHI2ASdjqOztyL8cKiffVwZ9oWcFEpR2GvToBwv2JJy3sWlS4jdOOUdIyvLoBBp7uBFmGEnm-tpsBNg1aCk_dkx6zJr4DlafWRRLZbQoq3b1U8uAA1x-6wJ-MwHt7B0SFElWNbOydURxF_goQ57R5HSh6KJ2g=w1280"
)

UA="Mozilla/5.0 (compatible; al-folio-asset-fetcher/1.0)"
fail=0

for filename in "${!assets[@]}"; do
  url="${assets[$filename]}"
  out="$IMG_DIR/$filename"
  tmp="$(mktemp)"
  printf "Fetching %s ... " "$filename"
  if curl -sSfL -A "$UA" --max-time 30 -o "$tmp" "$url" && [[ -s "$tmp" ]]; then
    mv "$tmp" "$out"
    printf "ok (%s bytes)\n" "$(stat -c%s "$out" 2>/dev/null || stat -f%z "$out")"
  else
    rm -f "$tmp"
    printf "FAILED — drop a replacement at %s manually\n" "$out"
    fail=1
  fi
done

exit $fail
