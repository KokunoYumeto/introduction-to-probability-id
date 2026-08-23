# R010 public modular backend

This is the deterministic public view of the complete Bahasa Indonesia main
book for R010, *Grinstead and Snell's Introduction to Probability*. It contains
4,716 schema-versioned records with stable,
locale-neutral identities, Indonesian expressions, source locators and hashes,
topology, concepts, terminology, rights, corrections, QA events, and artifact
bindings. All 786 English authority
`source_expression` records retain metadata but omit `data.text`; all id-ID
target-expression text remains present. Each omission carries both the v0
`omission_reason` field and the publication-envelope-compatible
`text_omitted_reason` alias with identical values.

The separately published 2008 selected-answer supplement is not distributed in
this view. A positive resource allowlist excludes exactly 1,159 private
supplement records (6 artifact, 2 edition, 287 exercise_answer, 1 qa_event, 574 relation, 1 resource, 1 rights, 287 segment). No answer identity, answer-expression segment,
answer relation, supplement artifact, private path, or supplement metadata is
retained.

Files:

- `public-safe-main.records.jsonl`: canonical UTF-8, LF-only JSON Lines records.
- `public-safe-main.records.csv`: a lossless CSV projection; every cell is canonical JSON.
- `record.schema.json`: the exact JSON Schema governing each record.
- `PUBLIC_SAFE_EXPORT_MANIFEST.tsv`: byte counts and SHA-256 hashes for the four payload files.
- `PUBLIC_SAFE_EXPORT_VALIDATION.json`: deterministic validation and two-replay receipt.

The validation receipt proves schema conformance, stable-ID uniqueness and
ordering, complete reference closure, lossless JSONL/CSV round-trip, exact live
bindings for the final 554-page PDF and its build evidence, exact bindings for
the final front-matter source units, absence of local paths and credential
shapes, and byte-identical generation in two independent temporary directories.
