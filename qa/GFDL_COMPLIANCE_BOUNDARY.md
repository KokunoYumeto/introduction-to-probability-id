# R010 GFDL compliance boundary

Date: 2026-08-21 (Europe/Berlin)

## Frozen textual authority

- Archive: `authority/archives/prob-official-source.tar.gz`
- Bytes: `2125284`
- SHA-256: `d1adaae8f205ac53113b902267ca3415422500b6ff92b1137fa11c7c8fbb26e9`
- Root source: `authority/source-original/prob.tex`
- Root bytes: `3785`
- Root SHA-256: `9f2a66443a931d785929904b4786a3b6b638ceeed7c5276315db8389416e4b42`

This 4 July 2006 source remains the textual authority for the Indonesian
edition.  A later 22 July 2006 artifact is used only to corroborate the license
terms described below.

## Same-corpus license corroboration

Official Peter G. Doyle / Dartmouth artifacts:

- Book page: `https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html`
- PDF: `https://math.dartmouth.edu/~doyle/docs/prob/prob.pdf`
- root TeX: `https://math.dartmouth.edu/~doyle/docs/prob/prob.tex`
- source archive: `https://math.dartmouth.edu/~doyle/docs/prob/prob.tar.gz`

Frozen 22 July 2006 values:

- `prob.tex`: 3,989 bytes; SHA-256
  `21596213f21fa2102a994d76e981b78d06cadac729a1e011c665809ee1e6169e`
- archive: 2,125,551 bytes; SHA-256
  `333226cc2c2a38bb41490568e865b5769436c5f70005710280a1301039ee8577`
- PDF: 2,994,162 bytes; 518 pages; SHA-256
  `bbdc7dbd2cd3bb1bb27f5f926d6a94fb8181dafe237eeaf139a31ce27f514d72`

An exact 140-file comparison found that the 4 July and 22 July source archives
differ only in `prob.tex`.  All chapters, front matter, back matter, and figures
are byte-identical.  The later root adds a fuller license notice and changes the
displayed date.  Its notice explicitly states: no Invariant Sections, no
Front-Cover Texts, and no Back-Cover Texts.

## Selected license

The source names the GNU Free Documentation License without selecting a
version.  GFDL section 10 therefore permits use of any published, non-draft
version.  This edition selects GNU FDL 1.3-or-later, with:

- invariant sections: none;
- front-cover texts: none;
- back-cover texts: none.

Official controlling English text:

- URL: `https://www.gnu.org/licenses/fdl-1.3.txt`
- local path: `source/LICENSES/GFDL-1.3.txt`
- bytes: `22955`
- SHA-256:
  `110535522396708cea37c72a802c5e7e81391139f5f7985631c93ef242b206a4`

The bundled English license must remain byte-for-byte unmodified.  An
Indonesian explanation may accompany it but cannot replace it.  The additive
`source/gfdl.tex` fragment typesets that exact file via `\verbatiminput`, and
`source/prob.tex` includes the fragment in the front matter.  This inclusion is
identity-independent; it does not satisfy the separate modified-version title
and history requirements below.

A bounded legacy-layout fixture at `qa/gfdl-layout-test.tex` typesets the exact
license at the book's five-inch text width.  Its retained eight-page PDF at
`qa/gfdl-layout-test-build/gfdl-layout-test.pdf` is 40,753 bytes, SHA-256
`5c11662428a467f1e571b2dea17fee4c0626ac48ad807d184baf708e8a59ab9e`;
the retained log at `qa/gfdl-layout-test-build/gfdl-layout-test.log` is 3,863
bytes, SHA-256
`e985fe149af528231c4dc6d3a0bae4284bb365752c38286a4ea3a20f4f333b75`.
The log contains zero overfull boxes.  Seven underfull-vbox notices reflect
page breaks in preformatted license text and do not clip content.  The first
and last pages were visually inspected.  The full-edition build remains the
final layout authority.

## Modified-edition requirements and disposition

PASS for the source and artifact boundary verified on 2026-08-21:

1. `source/publication.tex` names the original authors, the 2006 GNU lineage,
   KokunoYumeto as the Indonesian modifier and publisher, and the transparent
   source repository.
2. `source/history.tex` states the modified work's full title, the year 2026,
   KokunoYumeto as new modifier/author and publisher, and a summary of the
   modifications. This satisfies the History-entry fields required for the
   modified version.
3. The original copyright notice is preserved. The edition selects GNU FDL
   1.3-or-later with no Invariant Sections or cover texts and typesets the exact
   bundled English license without alteration.
4. The final 140-input closure contains 120 PostScript figures and 9,500,177
   bytes. It matches the live source byte-for-byte under
   `qa/MAIN_BOOK_FINAL_INPUT_MANIFEST.tsv`.
5. The 554-page final PDF includes the title, publication notice, History,
   complete English GFDL text, all twelve chapters, three appendices, and the
   index. Its newest deterministic build and visual checks are recorded in
   `qa/MAIN_BOOK_FINAL_QA.md`.

The separate component-rights boundary is resolved in
`qa/QUOTATION_AND_COMPONENT_RIGHTS_DISPOSITION.md`. Historically permitted
components whose translation scope was not independently established were
independently reformulated, summarized, or redrawn; the public modular backend
omits all English authority-expression text while preserving hashes and
locators. The official selected-answer supplement remains internal-only under
its own unresolved rights boundary.

No author contact was required for this compliance boundary, and none occurred.
