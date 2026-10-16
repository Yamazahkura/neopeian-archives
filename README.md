# Neopian Archives

Custom Neopets pet lookups and petpages using readable HTML, CSS, and original
artwork hosted through GitHub Pages. The Haunted Swamp Tour Office is our fictional
setting, with Ikharuss maintaining dossiers on unusual swamp residents.
Our first resident is **Amita**, a Mutant Cybunny with a gothic swamp archive lookup.

**Amita V02.1 is the latest confirmed working lookup.** Its exact compact HTML
is archived under `lookups/confirmed/amita/v02.1/`. The supplied readable source
is imported unchanged as `lookups/src/amita/v02.1-import.html`. See the
[baseline comparison](docs/amita-v02.1-baseline.md) for counts, provenance,
non-identical build output, and proposed follow-up corrections.

## Repository layout

| Path | Purpose |
| --- | --- |
| `assets/amita/`, `assets/shared/` | Existing hosted artwork; preserve paths and files |
| `lookups/src/<pet>/` | Readable working HTML and optional sibling CSS |
| `lookups/builds/<pet>/` | Generated compact submissions and count reports |
| `lookups/confirmed/<pet>/<version>/` | Immutable, exact confirmed originals |
| `scripts/` | Local build tooling |
| `docs/` | Compatibility evidence and repository baseline |

See [AGENTS.md](AGENTS.md) for project rules and collaboration conventions.

## Local development

Install Node.js 22.8 or newer, then install the locked dependencies:

```sh
npm ci
npm test
```

Work on a reviewable branch. Once a confirmed source has been supplied and
archived byte-for-byte, copy it to a **new** working version. For example, a future
`lookups/src/amita/v03.html` can have a sibling `v03.css`. The HTML is the full
description fragment, not a complete preview web page. A sibling CSS file is
automatically wrapped in `<style>...</style>` and prepended; no external CSS link
is needed. Existing embedded styles are also compacted.

Build that version, then verify the committed artifacts:

```sh
npm run build:lookup -- amita v03
npm run build:lookup -- amita v03 --check
```

The example `v03` does not exist yet. Reproduce the imported baseline with:

```sh
npm run build:lookup -- amita v02.1-import
npm run build:lookup -- amita v02.1-import --check
```

The build removes HTML comments and compacts CSS without selector/value
optimization, import inlining, or URL rebasing. CSS comments are retained. It
deliberately retains HTML whitespace, attribute
quotes, and optional tags to reduce the risk of changing a working layout. This
is conservative compaction, not maximum compression. Source files are untouched.
Any CSS parser warnings or errors stop the build for review.

The output is `lookups/builds/amita/v03.compact.html` with a count report alongside
it. The complete output must fit within **4,000 characters**, including style tags,
markup, URLs, text, and whitespace. Reports show code points, UTF-16 units, and
UTF-8 bytes; the tool conservatively enforces 4,000 UTF-16 units because Neopets'
Unicode counting behavior is unverified. It writes no extra trailing newline.
Oversized builds fail with a nonzero exit status before changing output. Existing
artifacts remain unchanged on validation failure; do not submit stale output.
`--check` writes nothing and fails if artifacts are missing or out of date.

Review readable source, compact output, and counts together. Commit all three.
The build does not establish CSS support or verify native Neopets controls.

## Compatibility and review

- Preserve native statistics, navigation, Petpet information, trophies, and
  functional controls. Do not hide them to make room for custom artwork.
- Scope custom CSS where practical. Never use `box-shadow`, `mix-blend-mode`, or
  `border-radius` in style blocks. Other CSS support remains unverified until
  tested on Neopets; consult [the compatibility record](docs/neopets-compatibility.md).
- Use original artwork/designs or obtain explicit permission and record it.
- Show Tori the branch or draft PR, changes, validation, and counts. Get explicit
  approval before merging, publishing, changing hosting, or submitting live code.
- After Tori confirms a working design, archive the exact provided file and its
  provenance/SHA-256 as a new immutable reference; do not overwrite older ones.

## GitHub Pages and petpages

This tooling builds local lookup submissions only. It adds no deployment workflow
and changes no GitHub Pages settings. Existing asset paths are preserved; see
[the repository baseline](docs/repository-baseline.md). Confirm the configured
Pages source and live asset URLs before any approved publishing change.

Petpages are in project scope, but this initial script specifically enforces the
pet lookup limit. Add separate readable petpage sources and build rules when a
petpage is provided; do not assume its editor shares lookup limits or CSS support.
