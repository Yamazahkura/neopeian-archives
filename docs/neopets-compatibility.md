# Neopets compatibility record

## Confirmed restrictions

These results were supplied by Tori during workspace setup on 2026-10-13.
They describe Neopets accepting lookup code inside style blocks, not general
browser support. Exact test dates, snippets, and rejection messages were not
provided; do not invent them.

| Property | Recorded result | Project rule |
| --- | --- | --- |
| `box-shadow` | Rejected inside style blocks | Do not use |
| `mix-blend-mode` | Rejected inside style blocks | Do not use |
| `border-radius` | Rejected inside style blocks | Do not use |

All other CSS properties, values, selectors, and at-rules are **unverified** until
tested in the relevant Neopets editor and rendered page. No supported-property
list is being inferred from Amita V02.1 because its code is not yet available.
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
