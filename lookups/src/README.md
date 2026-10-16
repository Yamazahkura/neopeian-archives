# Editable lookup sources

Use `<pet>/<version>.html` for the complete readable description fragment and,
optionally, `<pet>/<version>.css` for readable CSS. The build prepends that CSS
inside a style block; do not also link or duplicate it in the HTML.

For a future Amita working version, use `amita/v03.html` and `amita/v03.css`.
The V02.1 import is `amita/v02.1-import.html`, copied unchanged from Tori's readable
attachment, including its annotations. `v03` remains a future naming example.
See [the comparison report](../../docs/amita-v02.1-baseline.md).

Preserve meaningful HTML whitespace (including inline text and preformatted
content). The build retains HTML whitespace deliberately. The HTML should be
the submission fragment, not a preview document with head/body scaffolding.
