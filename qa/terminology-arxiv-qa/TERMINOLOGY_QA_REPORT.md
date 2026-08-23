# R010 Indonesian probability terminology QA

Date: 2026-08-22

## Scope and method

This is the one-time external terminology check requested for the complete
Indonesian R010 edition. The check was arXiv-first, inspected actual source
bytes where source was available, and used a representative Indonesian
probability textbook only after the arXiv source test failed. It does not treat
frequency in one document as a rule: mathematical meaning, internal
consistency, and established Indonesian field variation control each decision.

## arXiv source-package result

Bounded exact-term searches used `teori peluang`, `probabilitas`, `peubah
acak`, `ruang sampel`, and `teorema limit pusat`. They did not identify a
suitable Indonesian-language probability/statistics submission with TeX. This
is a bounded-search result, not a claim that no such arXiv submission exists.

The closest source-package candidate was Ismail Rusli, *Comparison of Modified
Kneser-Ney and Witten-Bell Smoothing Techniques in Statistical Language Model
of Bahasa Indonesia*, arXiv:1706.07786:

- landing page: https://arxiv.org/abs/1706.07786
- downloaded source archive: 39,111 bytes
- SHA-256: `acdd090e47d1e170cfbc0f62d8e6932e5a1736dbb90b1db489e7d0163e26dc71`
- archive members: `comparison.tex`, `comparison.bbl`, `diff.pdf`, `oov.pdf`,
  and `perplexity.pdf`
- inspected TeX: `comparison.tex`, especially lines 11-17 and 22-70

The title concerns Indonesian, but the actual abstract and article prose in
the TeX are English. It is also an NLP language-model paper rather than a
representative probability-theory exposition. It was therefore rejected as
terminology evidence rather than misrepresented as Indonesian mathematical
prose.

## Representative Indonesian fallback

Primary comparison source:

- Hidayah Ansori, Noor Fajriah, and Yuni Suryaningsih, *Teori Peluang*, first
  edition, Jurusan PMIPA FKIP Universitas Lambung Mangkurat, 2021,
  ISBN 978-623-97654-2-2
- repository record: https://repo-dosen.ulm.ac.id/handle/123456789/23100
- PDF: 266 pages, 2,124,755 bytes
- SHA-256: `1861dbfac23304dc4743546be39c00e995c213c9082955dac2619e5de304d358`

The complete PDF text was extracted for term counts. PDF pages 1, 7, 54, 57,
60, and 159 were also rendered and visually inspected. Those pages establish
the title/authors, `ruang sampel`, `variabel random`, `distribusi peluang`,
`fungsi kepadatan peluang`, `nilai harapan`, `fungsi distribusi kumulatif`,
`kejadian`, `peluang saling bebas`, and `peluang bersyarat` in their actual
mathematical layout. The source copyright notice allows short research/review
use but not republication; consequently its PDF is inspection evidence only
and is excluded from every R010 public payload.

## Comparison and decisions

| Concept | R010 decision | Field-source observation | Action |
| --- | --- | --- | --- |
| probability | `peluang` preferred; `probabilitas` admitted | Both forms occur; `peluang` dominates the textbook's mathematical compounds | Retain |
| sample space | `ruang sampel` | Exact match, including the formal definition on PDF page 7 | Confirm |
| event | `kejadian`; `peristiwa` contextual variant | The glossary on PDF page 159 uses `kejadian` | Confirm |
| random variable | `peubah acak`; `variabel acak` and `variabel random` variants | The comparison source uses `variabel random` | Retain R010's internally consistent preferred form; add the observed variant |
| probability distribution | `distribusi peluang` | Exact compound used throughout the comparison source | Replace six inconsistent `distribusi probabilitas` occurrences in `source/ch10.tex` |
| expected value | `nilai harapan` | Exact match on PDF page 60 | Confirm |
| variance | `varians`; `variansi` variant | The source alternates both spellings | Retain one edition-wide preferred form and record the variant |
| conditional probability | `peluang bersyarat` | Exact form appears in the source; `probabilitas bersyarat` also occurs once | Retain and document variation |
| independence | `saling bebas`; `independen` contextual variant | Both constructions occur, with `independen` especially after random-variable nouns | No context-blind replacement; clarify glossary note |
| density function | `fungsi densitas`; `fungsi kepadatan peluang` variant | The source consistently uses the latter | Retain R010's coherent term and add the full established variant |
| cumulative distribution function | `fungsi distribusi kumulatif` | Exact match on PDF pages 58 and 60 | Confirm |
| moment generating function | `fungsi pembangkit momen` | Exact match in section 2.9 | Confirm |
| LLN, CLT, Markov chain | Existing R010 terms | Not covered by the fallback textbook | No inference from absence |

Three missing reusable concepts were added to the glossary without changing
reader text: `probability measure` -> `ukuran peluang`; `equally likely` ->
`berpeluang sama`; and `mutually exclusive events` -> `kejadian saling lepas`.
Their attested variants are retained for interoperability.

## Propagation boundary

Exactly six reader-facing corrections were made, all in `source/ch10.tex`:
the occurrences at pre-change lines 440, 460, 472, 474, 496, and 848 now use
`distribusi peluang`. No formula, label, cross-reference, exercise identity,
or mathematical assertion changed. Other differing forms were retained as
documented variants because the external evidence demonstrates live field
variation rather than an error.

## Translation provenance

The exact required provenance statement was added additively to the edition's
license/credit page, repository README, and central-hub handoff metadata:

OpenAI Codex gpt-5.6-sol, Ultra.

All Grinstead, Snell, Doyle, CHANCE Project, KokunoYumeto, publisher, and
third-party credits remain intact.

## Closure result

The revised edition rebuilt successfully from exactly 140 manifest inputs /
9,500,200 bytes. Two clean isolated builds produced byte-identical DVI, index,
and normalized 554-page reader PDF. The final PDF is 3,403,487 bytes with
SHA-256
`f4921540bb47b09bb938bb18a5a6f78fd5340835fb834fe865f1eb0930b8b2b8`;
all 36 fonts are embedded, and the TeX log has no errors, undefined references,
rerun requests, or missing characters.

PDF pages 3, 414, 415, and 423 were rendered at 150 dpi and visually inspected.
They cover the new provenance line and all six terminology corrections. No
clipping, overlap, missing glyph, malformed formula, table displacement, or
bad reflow was found; the `dis-`/`tribusi peluang` line break on page 415 is
normal hyphenation.

The locale-neutral backend regenerated without identity churn: zero stable IDs
were added, the internal export contains 5,875 records, and the public-safe
main-book projection contains 4,716 records. Its validator independently
replayed the projection twice with byte-identical results and still excludes
all 1,159 odd-answer-supplement records.
