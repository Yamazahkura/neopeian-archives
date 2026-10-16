# Immutable confirmed references

The newest confirmed baseline is **Amita V02.2**:
`amita/v02.2/v02.2.compact.html` (3,667 characters), copied byte-for-byte from
the exact corrected build identified by Tori's live confirmation. Its
`metadata.json` records the originating commit, SHA-256, and reported behavior.

Tori's prior confirmed **Amita V02.1** compact file is preserved byte-for-byte at
`amita/v02.1/Amita_Lookup_Test_v02.1_vertical_compact.html` (3,468 characters).
Its separate `metadata.json` records SHA-256, provenance, approval scope, and
reported Neopets test context. See [the comparison report](../../docs/amita-v02.1-baseline.md).

For each future confirmed version, preserve the exact original bytes with a
separate metadata document recording filename, SHA-256, provenance, confirmation
date (if known), and Neopets test context. Do not normalize line endings, reformat,
or minify the archived original. If an older submitted compact file exists,
preserve it separately as provided rather than replacing it with a new build.

For future edits, copy a reference into a new version under `lookups/src/`.
References stay immutable even when a newer version is approved.
