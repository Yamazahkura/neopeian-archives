# Neopets compatibility record

## Confirmed restrictions

The first three results were supplied by Tori during workspace setup on
2026-10-13 without exact test dates, snippets, or rejection messages. The
`box-sizing` result comes from the V02.2 screenshot described below. These are
Neopets style-block filter observations, not general browser support.

| Property | Recorded result | Project rule |
| --- | --- | --- |
| `box-shadow` | Rejected inside style blocks | Do not use |
| `mix-blend-mode` | Rejected inside style blocks | Do not use |
| `border-radius` | Rejected inside style blocks | Do not use |
| `box-sizing` | V02.2 style-block rejection screenshot supplied 2026-10-16 | Do not use |

Other CSS properties, values, selectors, and at-rules remain **unverified in
isolation** until tested in the relevant Neopets editor and rendered page.
The whole-file V02.1 evidence below does not establish a general support list.
Do not assume that a style-block restriction implies inline styles are supported.

## Submission limit

Pet lookup descriptions have a 4,000-character maximum for the **entire submitted
code**. Include style tags, HTML, URLs, text, and all remaining whitespace.
The build reports Unicode code points, UTF-16 code units, and UTF-8 bytes. It
enforces 4,000 UTF-16 units conservatively; Neopets' exact Unicode counting method
has not been tested. Bytes are informational, not the character limit.
Petpage limits and compatibility may differ; do not apply this lookup limit as a
confirmed petpage rule.

## Recording new evidence

With Tori's approval for live testing, isolate one change at a time. Record:

- Date, lookup or petpage, editor, source version, and exact test snippet.
- Whether the editor accepted, rejected, or modified the submitted code.
- What the saved page rendered, with evidence or screenshots when available.
- Whether all native statistics, navigation, Petpet details, trophies, and
  functional controls remained visible and usable.
- Result (`confirmed accepted`, `confirmed rejected`, or `inconclusive`) and any
  relevant context. Retest in a different context before generalizing.

A passing build proves local generation and size checks only. It does not test
the Neopets filter, layout, accessibility, native controls, or live asset URLs.

## Amita V02.1 import evidence — 2026-10-16

Tori supplied `Amita_Lookup_Test_v02.1_vertical_compact.html` and reported that
this exact compact file passed Neopets filters and rendered successfully. It is
archived unchanged under `lookups/confirmed/amita/v02.1/` with SHA-256 and
provenance in `metadata.json`. The exact live test date and editor context,
screenshots, and explicit native-control checks were not supplied.

This is user-reported whole-file evidence. No live submission or rendering test
was performed during import. The 3,664-character generated development build
contains an additional CSS comment and four newlines; it has not been tested on
Neopets. See [the baseline report](amita-v02.1-baseline.md).

## Amita V02.2 scrolling prototype — 2026-10-16

Tori supplied a live Neopets error screenshot for the initial V02.2 draft. It
reads: "Invalid words or disallowed property names found in your style tags."
and explicitly lists `box-sizing`. Record **confirmed rejected** for this
property in this style-block submission context. The exact editor URL and live
test time were not supplied; do not infer acceptance of any other declaration.

The revised V02.2 removes `box-sizing` and uses `height:278px;overflow:auto`
with the existing 20px padding and 1px border, targeting the same 320px outer
height through the default content-box model. Tori subsequently reported another
TNT rejection: "Invalid/disallowed HTML attribute `tabindex`." The reported
problem line was `<div tabindex="0">`. Record **confirmed rejected** for the
`tabindex` attribute in this Neopets pet lookup submission context. The source
container was `<div class="ab" tabindex="0">`; its `tabindex="0"` attribute has
now been removed. No other HTML or CSS was changed by this targeted fix.

The resulting compact build awaits another live test. `overflow:auto`,
`overflow-y:auto`, and the new height remain unverified on Neopets; rejection
of an attribute does not establish acceptance of the rest of the lookup.

Local Chromium checks are browser evidence only. See
[the exact changes and artwork measurements](amita-v02.2-scrolling-dossier.md)
for source/build paths, counts, local evidence, and proposed live checks.
V02.1 remains the latest user-confirmed version.
