# Universal Lookup Template V1.0 and Amita V02.3 (WIP)

These drafts start from the exact live-tested V02.2 build, archived at
`lookups/confirmed/amita/v02.2/v02.2.compact.html` with SHA-256
`977f448de9fd1ee8459114d2194482de4a22be43b5bc953f2613c6d938e20a1e`.
The readable V02.2 source reproduces that build. Both confirmed versions and
all V02.1/V02.2 sources/builds stay unchanged. V02.2 remains the latest confirmed
baseline; **neither new draft has been live-tested on Neopets**.

## Sources and generated submissions

| Draft | Edit this readable source | Generated complete submission | UTF-16 count | Remaining |
| --- | --- | --- | ---: | ---: |
| Amita V02.3 | `lookups/src/amita/v02.3.html` | `lookups/builds/amita/v02.3.compact.html` | 3,936 | 64 |
| Universal V1.0 | `lookups/src/universal/v1.0.html` | `lookups/builds/universal/v1.0.compact.html` | 3,661 | 339 |

Count reports are adjacent `*.counts.json` files. All current output is ASCII,
so code points, UTF-16 units, and UTF-8 bytes match. Counts cover the full code,
including CSS, text, markup, credit, and retained whitespace. Amita's original
resident text is intact. The universal file intentionally contains generic
editing prompts, not replacement Amita lore.

## Smallest background experiment

The outer `.sd` container retains its dark fallback color and receives only:

```css
background-image:url(https://i.imgur.com/DhlJ1Pi.png);
background-size:cover;
background-position:center top;
background-repeat:no-repeat;
```

The image sits behind the dossier frame, not the body, native portrait, or stats.
`cover` scales uniformly to fill the background area without distorting the
aspect ratio; excess image can be cropped. `center top` anchors the top and
centers any horizontal crop. The default background positioning area is the
padding box. This is a placement test, not a promise of exact artwork alignment.
The background stays on the non-scrolling parent as lore scrolls inside `.ab`.

No existing opaque header, parchment, classification, or advisory fill is removed:
the frame is enough to test image placement without sacrificing text contrast.
Add one scoped rule `.sd .sn,.sd .aft { background:#202923 }` so the scroll note
and footer also retain a solid dark backing over arbitrary imagery. The image
is visible in the surrounding 18px padding/frame, rather than underneath all
reading text. Existing dark fallback and light text remain unchanged.

The only Amita HTML addition is a footer line linking the Whitespace credit to
`/userlookup.phtml?user=mexxyyy`. A scoped `.sd .aft a { color:#e6ddc8 }` rule keeps the link readable
on the dark footer. All native CSS rules, resident text, markup order, stationary
header, `height:278px;overflow:auto`, 20px reading padding, and 1px border remain
exact. That reading panel's outer height stays **320px**.

## Placeholder provenance and credit

The user supplied [this external image](https://i.imgur.com/DhlJ1Pi.png) and
identified it as a temporary placeholder from Whitespace's publicly shared
Neopets background resources, not original Neopian Archives artwork.
Authorization is for this temporary hotlinked draft, not redistribution or
modification. The repository contains only the URL; no image file has been
downloaded, copied, edited, rehosted, or redistributed.

**Actual image dimensions: unverified.** The browsing tool could not access the
image URL. Do not mistake the dossier dimensions for the image's natural width
and height. A browser with access can read `naturalWidth`/`naturalHeight` from the
external URL without saving an image file; those values must be recorded only
after successful loading, not from an error placeholder.

Tori supplied the original [Whitespace resource page](https://www.neopets.com/~Zirc),
which returned **403 Forbidden** through the browsing tool. Tori subsequently
identified [mexxyyy's userlookup](https://www.neopets.com/userlookup.phtml?user=mexxyyy)
as Whitespace's credit destination. Both drafts now link their visible
**Background: Whitespace** credit there using the Neopets-relative URL
`/userlookup.phtml?user=mexxyyy`. This destination is user-supplied; exact button
or wording requirements have not been independently verified. Preserve applicable
attribution until replacing the placeholder with authorized artwork.

## Reuse without a configuration system

Copy `lookups/src/universal/v1.0.html` into a new
`lookups/src/<pet>/<version>.html`; edit that readable copy and run the established
builder. For example, after creating the `lookups/src/example/` directory:

```sh
cp lookups/src/universal/v1.0.html lookups/src/example/v1.0.html
npm run build:lookup -- example v1.0
npm run build:lookup -- example v1.0 --check
```

No new substitution engine, configuration format, runtime script, CSS variables,
or dependency is introduced. The existing builder removes HTML guidance comments.

| Shared structure to retain | Character-specific edits in the readable copy |
| --- | --- |
| Native stacking and styling rules | Palette values, with contrast review; inspect native selectors if recoloring |
| `.sd` width, padding, border and image placement | Background URL and fallback color |
| `.ah` outside the scroll container | `.al` archive label, `.at` pet name, `.ast` title |
| `.ab` 278px content height + padding/border = 320px outer | Overview, classification values, advisory, optional lore sections inside `.ab` |
| Scroll note and footer structure | Archive footer wording and applicable artwork credits |
| Native portrait/Petpet, stats, navigation and controls | Decorative accents scoped to `.sd`, added incrementally after separate review |

The native elements are supplied by Neopets. The template retains the V02.2
native rules; it does not create fake portrait or stats elements. Do not move
native content into `.ab`, hide it, or replace its controls. The universal source
uses the existing palette and placeholder as explicit defaults, not immutable
character choices. Optional sections stay inside the reading area; its height
must not grow with lore. Long names or footer text can change the outer header
or footer heights and should be measured for each character.

## Validation report — 2026-10-16

```sh
npm ci
npm run build:lookup -- amita v02.3
npm run build:lookup -- universal v1.0
npm run build:lookup -- amita v02.3 --check
npm run build:lookup -- universal v1.0 --check
npm test
git diff --check
```

All **16 automated tests pass**, including immutable baseline checks and three
new checks covering the exact allowed V02.2-to-V02.3 changes, identical shared
CSS/element structure in the template, build freshness/count limits, visible
credit, and absence of known rejected features.

Separate local Playwright/Chromium checks used the two generated fragments,
with external requests deliberately blocked. They verify browser parsing and
layout only, **not image loading, image appearance, or live Neopets behavior**.
Both resolve the configured image URL, `cover`, `50% 0%`, and `no-repeat` as
computed styles; both measure 700 × 320px reading panels with 20px padding.
Current scroll travel is 190px for Amita and 127px for the generic template;
headers stay stationary while those panels scroll, without horizontal overflow.
Adding synthetic lore increases scroll travel without increasing dossier height.

In the 1000 × 1000px local viewport both dossiers measure **742 × 584px**, header
700 × 116px, footer 700 × 76px. The visible credit adds a 14px footer line compared
with V02.2's 570px total height. The reading panel stays at (21, 149) relative to
the dossier's outer upper-left. No background artwork dimensions are inferred
from these measurements.

New `background-image`, `background-size:cover`, `background-position:center top`,
and `background-repeat:no-repeat` declarations remain **unverified on Neopets**.
If the filter strips sizing, the browser may render at natural image size instead;
if it strips positioning/repeat, crop/tiling may differ. The fallback solid color
and opaque panels protect readability when the image fails to load. Neither
`tabindex`, `box-sizing`, nor other known rejected features are introduced.

For the next live check, use the exact generated file and record filter errors
or rewriting; then verify image loading/crop, stationary header, scrollbar,
320px reading panel, advisory reachability, credit, and native portrait/Petpet,
stats/navigation/trophies/controls. Actual creator credit requirements and remote
image appearance still need verification. No merge, publishing, Pages change,
or live submission was performed during implementation.

## Review branch

This draft is based on the still-open V02.2 preservation PR #3 and targets its
branch, so reviewers can see only the new integration/template work. It must
be retargeted to main after that dependency is merged with Tori's approval.
