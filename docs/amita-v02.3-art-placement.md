# Amita V02.3 artwork placement guide (planning only)

Paint one aged parchment dossier on a dark antique wooden desk, with restrained
swamp-green accents. Start with **742 × 570 CSS pixels** at display size;
use **1484 × 1140 pixels in Procreate (2×)**. This is a planning recommendation
matching the existing dossier footprint, not a new implemented layout.

The source is the immutable, user-confirmed V02.2 file:
`lookups/confirmed/amita/v02.2/v02.2.compact.html` (3,667 characters).
No V02.3 HTML/CSS, image, hosting, or native Neopets changes are included.

## Coordinate guide

All coordinates below start at the **upper-left of the outer dossier border**,
not the whole Neopets page. At 2× multiply every coordinate and size by two.
The source fixes widths and the reading-area height; header/footer/total heights
and their dependent Y positions are browser measurements, not fixed CSS heights.

| Area | Upper-left (CSS px) | Outer size (CSS px) | Evidence |
| --- | --- | --- | --- |
| Entire dossier `.sd` | (0, 0) | 742 × 570 | Width calculated from code; height measured |
| Header `.ah` | (21, 21) | 700 × 116 | X/Y and width from box model; height measured |
| Reading area `.ab` | (21, 149) | 700 × 320 | Width/height from box model; Y measured |
| Scroll note `.sn` | (21, 475) | 700 × 12 | Width from box model; Y/height font-dependent |
| Footer `.aft` | (21, 487) | 700 × 62 | Width from box model; Y/height measured |

Local Chromium 154 measurements used the exact corrected fragment at a
1000 × 1000 CSS-pixel viewport. Absolute dossier origin was (129, 25); the header
was (150, 46), reading area (150, 174), and footer (150, 512). These absolute
coordinates do not transfer to the live lookup. Native portrait/Petpet, stats,
navigation, and controls determine where the dossier begins on the page.
Tori's live confirmation establishes correct visual behavior, not these precise
pixel positions or a particular viewport/font measurement.

## What the code fixes

- Dossier: `width:700px`, padding 18px each side, 3px double border each side,
  `margin:25px auto`. Outer width is **700 + 36 + 6 = 742px**. Vertical margins
  are outside the artwork and excluded from its 570px recommended height.
- Header: automatic width within the 700px content column; padding 18px,
  border 1px. Its content width is **662px**. Font-dependent text and margins
  currently produce a 116px outer height; no fixed height is declared.
- Reading area: automatic 700px outer width, **20px padding** and **1px border**
  each side; `height:278px;overflow:auto`. Outer height is
  **278 + 40 + 2 = 320px**. Text width before scrollbar allowance is **658px**.
  Its 12px top margin creates the gap below the header.
- Footer: 16px top, 10px side, 4px bottom padding; no border; automatic height.
  Content width is **680px**; measured content height is 42px, outer height 62px.
- Scroll note: 11px type and 6px top margin. Its measured 12px line box contributes
  to the footer position and overall dossier height.

Header/footer line heights are `normal`; fonts, fallback fonts, site CSS, browser
zoom/wrapping, or future labels can change their heights. The reading window
stays 320px tall as lore grows. Confirm the exact live border-box dimensions
before final export or precise inked edge alignment.

## Painting safe zones

| Zone | CSS-pixel bounds (left, top → right, bottom) | Painting direction |
| --- | --- | --- |
| Header lettering | (40, 40) → (702, 118) | Quiet green/parchment; reserve for live office label, AMITA, subtitle |
| Reading panel | (21, 149) → (721, 469) | Low-contrast parchment throughout; all lore moves across this window |
| Initial text viewport before scrollbar allowance | (42, 170) → (700, 448) | No painted lettering or high-contrast decorative detail |
| Scrollbar reserve | (701, 150) → (720, 468) | Keep this 19px strip clear; scrollbar width varies by platform |
| Scroll note and footer | (21, 475) → (721, 549) | Leave calm space for live note and archive footer |

Keep the **entire reading panel** quiet: the padding scrolls with its content,
and the lower scroll positions may expose different parts of that window.
The scrollbar reserve is a conservative painting allowance, not a CSS guarantee.

Use soft wood grain, parchment edge wear, and restrained swamp-green accents
in the frame outside these zones. Preserve the outer 3px border as a bleed area.
There are only about 21px of side frame: large mushrooms, bottles, or desk props
will not fit there without a separately reviewed expansion of the art footprint.
Do not paint the AMITA title, lore, scrollbar, note, or footer into the image;
those remain live HTML. Keep text-zone texture broad and low contrast.

At **2×**, useful guides are:

- Canvas: **1484 × 1140px**.
- Header: **(42, 42), 1400 × 232px**.
- Reading panel: **(42, 298), 1400 × 640px**.
- Footer: **(42, 974), 1400 × 124px**.

## Future placement without stretching

Anchor the illustration to the **non-scrolling outer dossier**, not to `.ab`.
Only the lore scrolls inside its existing window. Use one image, no tiling,
no stretching to lore height, and no viewport-fixed background. A fixed display
size of **742 × 570px** matches the proposed painting and its aspect ratio.

Preferred first export: retain the 2× Procreate master, export a downsampled
**742 × 570px** image for native-size display. A 2× hosted image would need an
explicit **742 × 570px display size**; CSS support for any new sizing declaration
must be tested on Neopets. Do not assume `background-size`, `background-origin`,
or other untested declarations pass the filter. Avoid cover/cropping and
independent width/height scaling. If a smaller display is ever approved, scale
art and layout uniformly together and remeasure the text; do not shrink only
art underneath an unchanged 700px content column.

The artwork coordinates use the outer border box. CSS background positioning
normally starts from the padding box, 3px inward here. During V02.3 implementation,
explicitly verify the image origin and border offset rather than silently adding
3px drift. Prefer a live-tested mapping and allow paint to bleed under the border.

**Visibility dependency:** V02.2 currently paints opaque backgrounds on `.sd`,
`.ah`, `.ab`, the classification panel, and the advisory. Simply adding an image
behind them will leave much of it covered. A future V02.3 implementation must
separately review which fills to retain or adjust, with contrast checks. No fills
or styles are changed by this specification. Plan the painting with calm parchment
under the text even if retained panels later mask some of it.

## Budget and handoff

The confirmed submission is **3,667/4,000 characters**, leaving **333** for any
future additions including image URL, CSS, and whitespace. No V02.3 submission
exists yet; the image URL and new CSS must be built and counted before use.
The confirmed source/reference cannot be edited to make room. Work in a new
V02.3 source, preserve native elements, and test the exact generated submission.

Deliver the layered 2× master and a 1× export; retain separate parchment, wood,
texture, and decoration layers to adjust alignment after live measurements.
No artwork is implemented, uploaded, merged, or published by this preparation.
