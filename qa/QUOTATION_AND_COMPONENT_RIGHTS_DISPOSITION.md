# R010 quotation and component-rights disposition

Date: 2026-08-21 (Europe/Berlin)

## Result

PASS for the bounded public-edition policy described here. This is an evidence
and publication-scope decision, not a general legal opinion. The Indonesian
edition retains the mathematical content and source structure of the selected
GNU 2006 work while avoiding redistribution of third-party expression whose
permission or translation scope was not independently established.

The controlling book license is GNU Free Documentation License 1.3-or-later,
with no Invariant Sections, Front-Cover Texts, or Back-Cover Texts. The exact
unaltered English license is bundled at `source/LICENSES/GFDL-1.3.txt`. The
modified-edition title, date, modifier/author, publisher, source location, and
modification summary are stated in `source/publication.tex` and
`source/history.tex`.

## Components independently reformulated or replaced

The following components are not translated or reproduced from the protected
expression carried by the authority source:

- Exercises 1.1.13 and 1.1.15: independently worded Indonesian probability
  problems preserve the numerical data and mathematical objective, with a
  bibliographic attribution and an editorial-summary notice.
- Exercise 1.1.17: the modern Pólya expression is replaced by an independently
  written editorial summary that preserves the pedagogical point and citation.
- Exercises 1.2.24 and 1.2.30: the modern Linda and newspaper anecdotes are
  replaced by abstract, independently written probability models that preserve
  the requested comparisons and numerical distributions.
- The historical figure formerly supplied as `PSfig3-33.ps`: replaced by a
  newly typeset numerical Pascal-triangle representation that preserves the
  documented `34,35` asymmetry needed by the surrounding exercise.
- The historical figures formerly supplied as `PSfigBC.ps` and
  `PSfigblack.ps`: replaced by newly drawn conceptual diagrams preserving the
  normal-mixture and regression-to-the-mean arguments.
- Modern-secondary quoted or closely source-shaped passages in the preface and
  Chapters 1, 3, 4, 6, 8, 9, 10, 11, and 12: replaced by independent summaries
  with their citations retained and an explicit notice that source expression
  was not translated or reproduced.

The three removed PostScript files are absent from the live 120-figure set and
from the 140-file public build closure. The figure set is 8,263,763 bytes; its
deterministic manifest SHA-256 is
`9da14e508f5caac0577d1fedb20850701da2f8f703e26fe07606ade8f4580fd7`.

## Quoted matter retained

The remaining twelve active `quote` environments were inspected individually:

- Karl Pearson, 1894, in `source/ch1.tex`;
- Abraham de Moivre, 1756, in `source/ch3.tex`, twice in `source/ch4.tex`, and
  in `source/ch9.tex`;
- Christiaan Huygens / the 1692 Arbuthnot translation, three passages in
  `source/ch6.tex`;
- Francis Galton primary-source passages from 1877 in `source/ch9.tex` and
  1873 in `source/ch10.tex`;
- two independently generated English-language Markov examples in
  `source/ch11.tex`, explicitly identified as new examples rather than Shannon
  quotations.

The historical passages are attributed to public-domain primary works or old
translations; the two modern examples are newly generated. Bibliographic
titles, proper names, mathematical symbols, program identifiers, and literal
model-state labels remain where semantically required and are not untranslated
reader prose.

## Public modular-backend boundary

The internal backend may retain exact authority expressions for provenance and
replay. The public-safe backend must not republish any English
`source_expression` text. It retains stable record IDs, source locators, slice
boundaries, byte counts, content hashes, rights references, and dependency
links, and marks each omitted expression with:

```json
{
  "text_omitted": true,
  "omission_reason": "authority_source_expression_not_republished"
}
```

Indonesian target expressions remain present. The official 2008 selected-answer
supplement, its translation, and its answer-level backend records remain
internal-only because that separate PDF does not state a redistribution or
translation license.

## Audit boundary

The final bounded source audit found no remaining explicit “reprinted with
permission” marker, removed-figure reference, missing active figure asset,
unaccounted modern-source quotation, undispositioned English reader prose,
mojibake, or unbalanced environment. The eleven source files examined for this
rights-safe freeze contain 985,807 bytes; their deterministic manifest SHA-256
is `a72ff4e82e6e9a329f87d3a4cb72d823cba1f912c44357b919c6da128b4206f6`.
The complete 140-input build closure contains 9,500,177 bytes and is bound by
`qa/MAIN_BOOK_FINAL_INPUT_MANIFEST.tsv`.

The publication policy follows a conservative expression-focused boundary.
The U.S. Copyright Office describes fair use as case-specific and notes that
there is no fixed permissible word count or percentage; this edition therefore
does not rely on a numerical quotation threshold for the modern components.
No author contact occurred during production.
