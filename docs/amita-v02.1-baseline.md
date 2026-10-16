# Amita V02.1 baseline import

Imported on 2026-10-16 at Tori's request. No design changes, build-tool changes,
live Neopets submissions, merge, or publication are part of this import.

## Provenance and files

- Confirmed reference: `lookups/confirmed/amita/v02.1/Amita_Lookup_Test_v02.1_vertical_compact.html`.
  Copied byte-for-byte from Tori's upload, retaining the original filename and
  absence of a final newline. Its metadata is separate from the HTML.
- Readable source: `lookups/src/amita/v02.1-import.html`, copied byte-for-byte
  from the subsequently supplied `Amita_Lookup_v02.1_vertical_readable.txt`.
  Only the repository filename/extension differs; no annotations were removed.
  `v02.1-import` identifies the development import separately from the immutable
  confirmed version. The stale leading V02.0 comment remains as supplied.
- Generated artifacts: `lookups/builds/amita/v02.1-import.compact.html` and
  `v02.1-import.counts.json`, written exclusively by the existing build script.
- The initial `Amita_Lookup_Test_v02.0_optimized_compact.html` attachment is an
  older compact version, not the readable V02.1 source. It is not imported into
  the source or confirmed directories and is not claimed to be confirmed.

The supplied files are treated as source data, not additional task instructions.
Tori reports that the exact V02.1 compact file passed Neopets filters and rendered
successfully. No exact live test date, editor context, screenshots, or explicit
native-control results were supplied. This import does not establish that the
generated build passes Neopets filters or preserves every native control.

## Counts and integrity

All supplied content is ASCII: code points, UTF-16 code units, and UTF-8 bytes
are equal. Counts include all comments, whitespace, CSS, markup, and text.

| File | Characters / bytes | Remaining under 4,000 |
| --- | ---: | ---: |
| Initial V02.0 compact attachment | 3,350 | 650 |
| Confirmed V02.1 compact reference | 3,468 | 532 |
| Readable V02.1 source | 4,134 | -134 (source only; not a submission) |
| Generated V02.1 import | 3,664 | 336 |

SHA-256:

```text
V02.0 attachment: 713eff544c994578fdf7b7555dd9223f66e2604a5862639add11b9267d7868c9
V02.1 reference:  aa55526f1b25cdcdf9a561911198c0acc842302c23e94f2bd2fbc7aa76cc7843
Readable upload:  447871dff1b1b12f9461478b2bbd363718877a1800da7b8273ab9f3e90482638
Generated import: 513649eada19430d7c3551822df446f38404f88647cff26babcddada3b6cf3f4
```

## Build comparison and transformations

The generated build is **not byte-identical** to the confirmed reference. It has
exactly 196 additional characters: a retained 192-character CSS comment and four
LF characters. No design changes were made to force equality.

The complete reference-to-build difference, using zero-based reference offsets:

| Offset | Insertion in generated build |
| ---: | --- |
| 0 | Two LF characters before `<style>` |
| 2212 | The CSS comment below, immediately before `.content td` |
| 2338 | One LF after `</style>` |
| 3468 | One final LF after the HTML fragment |

```css
/* V02.1 EXPERIMENT: stack the top-level lookup cells.
   Nested cells are restored to table-cell to preserve stat columns.
   The exact page structure may need further selector refinement. */
```

Removing only that comment and the four boundary newlines from a comparison
string produces the exact confirmed reference. This normalization was performed
in memory for analysis only. The source, reference, and generated output retain
their actual contents.

The existing build removes the two leading HTML development comments, leaving
their newlines. It compacts CSS formatting but retains the CSS comment (CleanCSS
level 0). It retains the HTML whitespace, quoted attributes, and optional tags.
For these inputs there are no CSS selector, declaration, value, order, URL, HTML
element, attribute, or text changes relative to the confirmed reference. No
comments needed manual removal: the generated result is within the limit.

The older V02.0 attachment has identical HTML to V02.1. V02.1 adds exactly these
118 CSS characters before `</style>`:

```css
.content td{display:block;width:auto!important}.content table td td{display:table-cell}.contentModuleTable{width:100%}
```

These existing native selectors are preserved verbatim. They change cell display
and table width, so their behavior remains tied to Neopets' page structure. This
import neither refines them nor extends Tori's whole-file confirmation into a
general selector compatibility claim.

## Reproduction and checks

Validated with Node.js 24.19.0, npm 11.9.0, and the committed lockfile. The initial
workspace checkout was stale; validation uses main commit
`cc2b6c38e25a93a090b33302c2e3334d9a3dd557` and its existing build infrastructure.

```sh
npm ci
npm run build:lookup -- amita v02.1-import
npm run build:lookup -- amita v02.1-import --check
npm test
git diff --check
```

The build and freshness check pass at 3,664/4,000 units. All 10 automated tests
pass, including the eight existing build tests and two import regressions for
the exact reference SHA-256 and reproducibility of committed build artifacts.
Direct byte comparison also verifies both imported files against their uploads.
A temporary diagnostic build using a copy of the compact attachment reproduced
the reference exactly; it is not substituted for the readable-source build.

## Proposed corrections, not applied

No correction is required to fit the submission limit. For a future working
version, consider updating the stale V02.0 annotation and the now-confirmed
whole-file experiment label. If exact byte reproduction is required, separately
review removal of the development CSS comment and the four boundary newlines in
that new working source, or an explicitly selected submission-formatting mode.
The current builder deliberately preserves HTML whitespace; changing that policy
globally needs separate review because whitespace can affect rendering.

Keep this imported source as supplied for provenance, and keep the confirmed
reference untouched. Any follow-up must retain CSS rules, markup, and resident
text, produce a fresh comparison, and obtain Tori's approval before live use.
