# Amita V02.2: Scrolling Dossier Prototype

Draft based on the confirmed V02.1 source on main commit
`440d82f`. V02.1 remains the latest confirmed lookup. No background images,
live submission, publication, merge, or hosting changes are included.

## Files and scope

- Readable source: `lookups/src/amita/v02.2.html`.
- Generated submission: `lookups/builds/amita/v02.2.compact.html`.
- Exact counts: `lookups/builds/amita/v02.2.counts.json`.
- Regression checks: `tests/amita-scrolling.test.mjs`.

The portrait/Petpet, statistics/controls, then custom dossier arrangement keeps
all existing native-selector declarations unchanged. The native markup is supplied
by Neopets, not this fragment. Its live rendering and controls still require
Tori's verification. All V02.1 source, build, and confirmed files are untouched.

## Exact CSS changes relative to V02.1

No existing declaration, selector, value, or rule order was changed or removed.
The existing `.sd .ab` parchment panel becomes the reading area:

| Selector | Added declaration | Purpose |
| --- | --- | --- |
| `.sd .ab` | `height:278px` | Content height; with 40px padding and 2px border, outer height is 320px |
| `.sd .ab` | `overflow:auto` | Allow scrolling when content exceeds the panel |
| `.sd .sn` (new rule) | `font-size:11px` | Small scroll note |
| `.sd .sn` (new rule) | `text-align:right` | Align the note with the panel's right edge |
| `.sd .sn` (new rule) | `margin:6px 0 0` | Gap above the note |

The initial draft used `height:320px;box-sizing:border-box`. Tori supplied a
live Neopets rejection screenshot naming `box-sizing` on 2026-10-16. The revised
draft removes that declaration and uses the default content-box calculation:
`278 + 20 + 20 + 1 + 1 = 320px`. It requires another live test; the screenshot
does not establish acceptance of `overflow:auto` or any other addition.

The existing `border:1px solid #9a9b7b` supplies the subtle reading boundary.
Existing parchment/green colors, 20px panel padding, and 12px header-to-panel gap
remain unchanged. The `.ah` header already sits outside `.ab`: no sticky, fixed,
or absolute positioning is needed. It remains stationary while `.ab` scrolls;
the whole lookup still follows normal page scrolling.

Source annotations only: replace the two stale opening HTML comments with a V02.2
prototype comment; add `/* Custom dossier */` and
`/* Native V02.1 rules unchanged */`; remove the old 192-character V02.1 experiment
comment in this new copy. Native stacking rules themselves remain exact.
The builder retains CSS comments, so these annotation changes affect build size.

## Exact HTML changes

1. Add `tabindex="0"` to the existing `<div class="ab">`, allowing keyboard focus
   for browser scrolling. Neopets acceptance/preservation of this attribute is
   unverified.
2. Insert `<div class="sn">Scroll to read more</div>` immediately after `.ab` and
   before the existing `.aft` footer, outside the scrolling content.
3. Split the formerly single-line markup across lines for readable source.
   Existing element order, attributes, and resident text are otherwise exact.

Resident Overview, Resident Classification, and Visitor Advisory all remain in
`.ab`. The office label, AMITA, and The Swamp Witch remain in `.ah` above it.
No additional wrapper, replacement native information, lore, images, URLs, or
controls were introduced.

## Procreate planning measurements

All measurements are CSS pixels, not device pixels or Procreate DPI. Proposed
geometry assumes the existing default content-box model for `.sd`, its inherited
700px content width, and no external Neopets CSS overriding these rules.

| Item | Proposed measurement |
| --- | --- |
| Reading panel, including border and padding | 700px wide × 320px high |
| Panel padding | 20px on each side |
| Panel border | 1px on each side |
| Text area before scrollbar allowance | 658px wide × 278px high |
| Panel upper-left relative to outer `.sd` border box | x = 21px; y ≈ 149px |
| Header upper-left relative to outer `.sd` border box | x = 21px; y = 21px |
| Header outer dimensions in the browser fixture | 700px × 116px |
| Gap between header and reading panel | 12px |
| Outer dossier border box in the browser fixture | 742px × 570px |
| First text area's upper-left relative to outer dossier | x = 42px; y ≈ 170px |

For an illustration aligned to the dossier, reserve a 700 × 320px reading window
at approximately (21, 149) within a 742px-wide dossier. At 2× artwork scale,
double these pixel measurements; preserve the CSS sizes when placing the art.
A traditional scrollbar can consume additional text width (often around 15–17px,
platform dependent); the outer panel stays the same size.

In an isolated 1000 × 1000 browser viewport, the outer dossier started at
(129, 25) and the panel at (150, 174). These are fixture coordinates, not live
Neopets page coordinates. The real page Y position depends on the portrait,
Petpet, native stats, and controls above the dossier; measure it on the live site
before final artwork alignment. Font metrics and site overrides can also change
the approximate header height and panel Y offset.

## Validation and limitations

Validated locally on 2026-10-16 with Node 24.19.0 and Chromium 154.0.8037.57:

```sh
npm ci
npm run build:lookup -- amita v02.2
npm run build:lookup -- amita v02.2 --check
npm test
git diff --check
```

The full generated ASCII submission is **3,680/4,000** code points, UTF-16 units,
and UTF-8 bytes: **320 characters remain**. The existing builder is unchanged.
All 12 automated tests pass, including baseline integrity, build freshness,
and exact comparisons of every V02.1 CSS rule and resident element after removing
only the documented additions.

The browser measurements and scrolling assertions were rerun successfully after
removing `box-sizing`; the panel and dossier geometry stayed identical.

A separate local Playwright-driven Chromium check rendered the generated fragment
with no native Neopets fixture. Current content scrolled 190px, with no horizontal
overflow and an unchanged header rectangle. Adding a temporary paragraph with
1,000 repetitions of `Fixture expansion. ` increased scroll travel to 2,721px,
while the dossier stayed 570px tall. Synthetic text was never saved to source.
A temporary `overflow-y:auto` override also scrolled 190px. The submitted version
uses `overflow:auto`; neither form is claimed to pass the Neopets filter.

Chromium CLI `--dump-dom` attempts failed or hung in this environment; the browser
measurements above came from the successful Playwright driver. Playwright was
installed in a temporary directory only; no repository dependency or build change
was required. The committed test suite does not require a browser.

Tori should test the exact compact file in the live editor, recording acceptance,
rejection, or rewriting of `overflow:auto`, `height`, and `tabindex`;
then check wheel/trackpad and focused keyboard scrolling, advisory reachability,
header stability, portrait/Petpet, all native stats/navigation/trophies, and
functional controls. If the filter rejects the prototype, record its exact message
before trying the alternative overflow declaration in a separate working version.
Do not silently promote this draft to a confirmed version.
