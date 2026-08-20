# R010 figure-localization validation

Date: 2026-08-21 (Europe/Berlin)

## Result

PASS. The final main-book source contains exactly 120 PostScript figures. All
120 render successfully. An all-figure rendered-text extraction and six visual
contact-sheet sweeps found no undispositioned English reader prose, including
text represented as outlines or raster content.

Twenty-three source figures were localized in this pass. `PSfig1-6.ps` had
already been localized in the preceding main-book correction and was verified
but not changed here. The complete 120-file figure set contains 8,263,763 bytes.
The SHA-256 of the deterministic manifest formed from case-folded filename
order and lines `sha256  bytes  filename\n` is
`9da14e508f5caac0577d1fedb20850701da2f8f703e26fe07606ade8f4580fd7`.

## Changed figures

| File | Bytes | SHA-256 |
|---|---:|---|
| `PSfig1-4.ps` | 50,558 | `59630aca0b5cc39baa1fa4a3a5fc70ee56205e203bae12b5039a5a04dd6de6ba` |
| `PSfig1-5.ps` | 222,463 | `44a7d13569bc02b4bc3c07ce6e074974bc4629804fd6b342952e38b6bfa629b4` |
| `PSfig1-8.ps` | 28,909 | `ba59948894095f2ac1b7df90572af2e919866af379b74d088e0439f299811853` |
| `PSfig1-9.ps` | 67,906 | `bf181c0321334a92a56c8625a2ac44a5548d4e1864f74120e31bc43331b1b85b` |
| `PSfig2-4.ps` | 70,961 | `3e9d6be736cf0af4ac1f776e1e5546ce0c6aaee68d3935a3f68a6b47ddc1c0ad` |
| `PSfig2-23.ps` | 59,189 | `1104e87ff253f13292d75f14cc5adf8f40d5b0855739ae1730e38e624969dae1` |
| `PSfig3-1.ps` | 28,549 | `442d6e472782f59b3043c7b399a97974f1ba52c6897837638a2042f58181ba3e` |
| `PSfig3-2.ps` | 29,189 | `f7fbd218658eaeb1fd90bf69486df4fa5ee1de7bfa30ebdd812cedb8c5bcd554` |
| `PSfig3-7.ps` | 31,120 | `577d8fe27d1d2819491cd20b5612f860c057dcca84a31ecf4b969bb9d6a6fb1b` |
| `PSfig4-0.ps` | 59,747 | `20252bfca953f8a916406982ded18b6b4591fc2efb0be1964193fa26d31f9ecf` |
| `PSfig4-1.ps` | 28,448 | `aa4a2e3e5fbbf3ea18edd1e03c0ff01571ee83ced330aa6b55377ae69887be82` |
| `PSfig4-2.ps` | 28,723 | `859cb0aaed70e980f99826b192a467644a701e0b326bb836d15a17cfb6624c20` |
| `PSfig4-3.ps` | 29,285 | `6f1a67a2e67ccfb4bc321dd15728c954dfc3fe405dbc7ebd48ffb41990e207e3` |
| `PSfig4-3-5.ps` | 29,986 | `2d848437403298bdcbf11c1ec7688e79b383cf7e5edf06bd45723d50f6dfbdeb` |
| `PSfig4-4-5.ps` | 27,709 | `13d13f003ec43ccd18f369da7ad29ebac3801626ceef94815df4526f1c0682b0` |
| `PSfig4-5.ps` | 57,849 | `90d0257f6fbb7f1c185a3890a2e1bf07e0ce4fc4ee8e09b701e1ef9856ff51de` |
| `PSfig4-7.ps` | 62,322 | `9960fa29671fd5dbb51c4011ab5991c5134a7248cea0e9e47cd6c901ff5a9bbf` |
| `PSfig4-8.ps` | 62,301 | `75f7b8de6af7f77d975af57fefcb785b048629d487db5f2fc78fcfd7163ece42` |
| `PSfig4-9.ps` | 26,944 | `a0ba0f3609cedfffd800a270802ed72da4ff93e73ab329bd8a2e1a432397da18` |
| `PSfig5-13.ps` | 30,654 | `8442367b0c4adc190642cdabc8dfed2b9266e3ff6d6f81b1d53567182e86671d` |
| `PSfig7-8.ps` | 41,244 | `32d0a23364f5f3cf7255011c3f9ff57e31902d80648b62c61b88dc2eb9086ac1` |
| `PSfig9-2-5.ps` | 59,312 | `c7a5999a97dc38f1b99e2241c8788af2fcee71ba2306a0274c315e6ee83adfd1` |
| `PSfig11-6.ps` | 74,313 | `731d274039d5c0c7797cdfc2bbf87d1fc01bbd49bebe3946d539a9ee9151f4f8` |

## Localization and retained symbols

Reader-facing simulation, sampling, food-tree, Monty Hall, urn, family-tree,
cancer-tree, machine-result, envelope, distribution-graph, normal-area, and
time-reversal labels were translated into natural Bahasa Indonesia. Three
spacing regressions detected in preliminary renders were corrected before the
final pass.

The audit intentionally retains mathematical or model-state symbols (`H/T`,
`W/L`, `S/F`, `b/g`, `A/B`, variables, and `NA`), the literal Monopoly board
square `GO`, proper names (including Woodstock, Tunbridge, Monty, Ali, Baba,
and Smith), and bibliographic titles or institution names used as citations.
These are not untranslated reader prose.

All temporary render and text-extraction outputs used for this bounded audit
were deleted after validation. The live PostScript sources and this receipt are
the durable evidence.
