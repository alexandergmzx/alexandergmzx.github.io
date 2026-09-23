# EB Garamond (Regular, Latin subset)

The heading face of the walkthrough, the same one the portfolio uses, so the page matches it offline
(ADR 0038: the bundle fetches nothing external).

- **Source:** the portfolio's copy, `al-folio/assets/fonts/eb-garamond/font.ttf`, itself unmodified from
  [Google Fonts](https://fonts.google.com/specimen/EB+Garamond)
  ([download](https://fonts.gstatic.com/s/ebgaramond/v33/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUAw.ttf)).
  SHA-256 `934aa932b4bc1a75d883f7c3d4d5bbc8278e5e7fcc96d5440bbffd61050cf958`.
- **Modification:** subset with fontTools 4.46 to Latin (Google's `latin` ranges plus the arrows U+2190–2199),
  converted to WOFF2; all layout features and every name record (copyright, licence) kept:

  ```
  python3 -m fontTools.subset font.ttf \
    --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD" \
    --layout-features='*' --name-IDs='*' --notdef-outline --flavor=woff2 \
    --output-file=EBGaramond-Regular.woff2
  ```
- **Output:** `EBGaramond-Regular.woff2`, 24 068 B, SHA-256
  `1f168283d04830e8371d7fe4333010f57b09c0f7c3b4e2f511fd59e5b8d30f70`.
- **Licence:** SIL Open Font License 1.1 (`OFL.txt`, verbatim). The licence declares no Reserved Font Name,
  so the modified font keeps its name.
