# thewhitemage. portfolio

Static HTML/CSS/JS site, deployed to GitHub Pages at https://0xwhitemage.github.io/
from repo `0xWhiteMage/0xwhitemage.github.io` (branch `main`, root).

## Conventions

- **Featured work rule**: the homepage Featured work list features exactly one
  entry — the latest quant release — labelled `Qwen3.8 27B Kearuga (Name)` with
  meta `FORMAT · N.NNbpw`. Swap it in whenever a new quant ships.
- **British English** throughout all prose (`quantisation`, `optimisation`,
  `summarisation`). American spellings only in code identifiers
  (`currentColor`), URLs and quoted proper nouns (PR titles, header names).
- **No em-dashes or en-dashes** in copy; use commas, colons, periods or `&middot;`.
- **Monochrome palette**: `--accent` is `#000` light / `#fff` dark (the brand
  artwork is black-and-white). No hue accents.
- Work rows link to local feature pages in `work/`; feature pages use the
  shared template (back link, h1, lede, meta dl, article sections, footer, dock).
- Contribution pages present each PR in a `.pr` block: h3 title, `.pr-line`
  (#N link + dates + `.pr-status` pill — `is-merged` for merged), prose.
- No frameworks, no build step, no tracking. Self-hosted Poppins + Acumin Pro.

## Verify / deploy

- Local preview: `python -m http.server 8765` in the project root.
- Check routes return 200, brace balance in `assets/css/style.css`, and no
  em/en dashes (`grep -n "—\|–" *.html work/*.html`).
- Deploy: `git add -A && git commit && git push` — Pages rebuilds in ~1 min.
  Only push when the user asks.
