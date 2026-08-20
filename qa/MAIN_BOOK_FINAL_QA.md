# Final QA — buku utama *Pengantar Peluang*, edisi Bahasa Indonesia

Tanggal verifikasi: 2026-08-21 (Europe/Berlin)

## Hasil

PASS untuk sumber buku utama dan artefak PDF publikasi. Seluruh dua belas bab,
materi awal, tiga lampiran, indeks, pemberitahuan modifikasi, Riwayat, dan teks
GNU FDL 1.3 dibangun dari sumber Bahasa Indonesia yang hidup. Komponen modern
atau berizin historis yang cakupan penerjemahannya tidak dibuktikan telah
dirumuskan ulang, diringkas, atau digambar ulang secara mandiri sesuai
`qa/QUOTATION_AND_COMPONENT_RIGHTS_DISPOSITION.md`.

Identitas publik `KokunoYumeto` dipakai secara konsisten sebagai pemodifikasi,
penulis modifikasi, dan penerbit edisi ini. Nama legal yang tidak dipublikasikan
tidak direka. Halaman judul dan Riwayat menyatakan bantuan Codex secara
transparan.

## Penutupan input

Build kanonis terisolasi berada di `qa/main-book-closure-v3/source`. Allowlist
input terdiri atas tepat 140 file:

- 20 file sumber/pemberitahuan: `prob.tex`, `front.tex`, `preface.tex`,
  `publication.tex`, `history.tex`, `ch1.tex`–`ch12.tex`, `back.tex`,
  `gfdl.tex`, dan `LICENSES/GFDL-1.3.txt`;
- 120 file PostScript di `figures/`.

Jumlah input adalah 9.500.177 byte. Setiap file pada allowlist tersebut sama
byte demi byte dengan pasangannya di `source/`; jumlah ketidakcocokan adalah
nol. Manifest per file `qa/MAIN_BOOK_FINAL_INPUT_MANIFEST.tsv` berukuran 12.665
byte dengan SHA-256
`afe4a1e93bf9777519efdbf4f4e61657ea697f2d26680733338f05dc630d7560`.
Manifest UTF-8 tanpa BOM itu diurutkan menurut path relatif case-folded dan
memakai kolom `sha256`, `bytes`, dan `relative_path`.

Generator bounded `qa/generate_main_input_manifest.py` berukuran 3.812 byte
dengan SHA-256
`362f3cab1b18fcb570771b98807642005344e293a549159b309c7d07f35d374a`.
Set gambar lengkap memuat 8.263.763 byte; manifest deterministik 120 gambarnya
memiliki SHA-256
`9da14e508f5caac0577d1fedb20850701da2f8f703e26fe07606ade8f4580fd7`.
Semua 120 gambar berhasil dirender dan diaudit di
`qa/FIGURE_LOCALIZATION_VALIDATION.md`.

## Artefak build final

- `qa/main-book-closure-v3/source/prob-final.pdf`: 554 halaman Letter;
  3.403.297 byte; PDF 1.4; SHA-256
  `531fd89180fe759056c4484020f855f9e393317566ba62147a5a378b5b7cae2f`.
- `qa/main-book-closure-v3/source/prob-publication.pdf`: 3.465.673 byte;
  SHA-256
  `04c54435fe4a3d99e2e9c4ce5c29961b1472ef9c62355b70d88c2e84a44795f4`.
- `qa/main-book-closure-v3/source/prob.dvi`: 1.875.800 byte; SHA-256
  `003c5fa95ffed4be76027ebfef3107d1ef93d4434f1b86282ce789d7470448cd`.
- `qa/main-book-closure-v3/source/prob.idx`: 28.979 byte; SHA-256
  `be2051dcc14240a8a4ef41e7c89784f1b7ff1a4478822abc04392619e9b3e5ca`.
- `qa/main-book-closure-v3/source/prob.ind`: 19.951 byte; SHA-256
  `7a4c258b25b8595da52fce4311c5f3ff96f37fc5bfbdedfb7c65c0685c9964a7`.
- `qa/main-book-closure-v3/source/prob.ps`: 12.101.605 byte; SHA-256
  `04aa8b0e42987695a4e4100018d2a3a15f60affd5eb1b251cceea5c461906049`.
- `qa/main-book-closure-v3/source/prob.log`: 62.849 byte; SHA-256
  `e99de5206a4ad5920b1df7dd3bc5336b3277c8fc80ec35efb880f315a642f97e`.

PDF final mempunyai metadata judul/penulis/penerbit yang tetap, 554 media box
Letter, tidak terenkripsi, tanpa formulir atau JavaScript, dan 36/36 font
tertanam serta disubset. Parser PDF ketat membuka seluruh 554 halaman tanpa
kesalahan.

Log final melaporkan nol kesalahan TeX, referensi/sitasi tak terdefinisi,
permintaan rerun, karakter hilang, atau file hilang. Ada 190 overfull hbox: 44
melebihi 10 pt, enam melebihi 20 pt, dan maksimum 50,90579 pt. Ada 34 underfull
hbox, 19 underfull vbox, satu overfull vbox kecil 1,11096 pt, dan empat
peringatan harmless `h` menjadi `ht`. Enam kotak di atas 20 pt diperiksa secara
visual; semuanya merupakan baris paragraf/formula warisan dan tetap berada
sedikitnya 75,386 pt dari tepi fisik halaman. Tabel Pascal yang sebelumnya
melebar 114,42888 pt telah direflow, dibangun ulang, dan kini pas serta
terpusat.

`qa/finalize_main_pdf.py` berukuran 5.558 byte dengan SHA-256
`2e1097e756e21163756183e9b1569a1953d11f88e7c4f08f3318300592616a55`.
Skrip memvalidasi PDF sementara sebelum penggantian atomik, menolak input dan
output yang sama, menormalkan metadata/ID, membuang objek yatim, memeriksa
jumlah halaman/font, dan membersihkan file sementara pada kegagalan.

## Reproduksibilitas independen

Build kedua dimulai dari salinan baru tepat 140 input manifest dan memakai
`SOURCE_DATE_EPOCH=1780000000` serta `FORCE_SOURCE_DATE=1`. Seluruh tahap
`latex`/`makeindex`/`dvips`/Ghostscript/finalizer keluar dengan kode nol.
MakeIndex menerima 821 entri, menolak nol, menghasilkan 717 baris, dan memberi
nol peringatan.

Replay menghasilkan `prob.dvi`, `prob.idx`, `prob.ind`, dan `prob-final.pdf`
yang sama byte demi byte dengan build kanonis, termasuk PDF final 3.403.297 byte
dan SHA-256 yang sama. PostScript dan PDF mentah Ghostscript sengaja tidak
digunakan sebagai identitas reproduksibilitas karena `dvips` menyisipkan waktu
dinding; finalizer menghapus nondeterminisme tersebut.

## Pemeriksaan visual penutupan

PDF final terbaru dirender pada 144 dpi, bukan kandidat sebelumnya. Delapan
puluh halaman fisik diperiksa: 1–21, 28, 29, 35–37, 44, 53, 58, 60, 61, 64,
92, 97–99, 120, 134, 136, 141, 159, 162, 165, 174, 200, 201, 206–208, 211,
213, 243, 257, 278, 282, 285, 321, 335, 343, 363, 369, 395, 399, 405, 445,
506, 515, 536, dan 543–554.

Cakupan itu memuat halaman judul, pemberitahuan/Riwayat/GFDL, semua permukaan
hak yang direvisi, setiap halaman gambar yang dilokalkan, tabel Pascal halaman
136, enam halaman risiko overflow, pembuka semua bab, tiga lampiran, dan seluruh
indeks. Tidak ditemukan clipping, overlap, gambar hilang, glyph rusak, label
cacat, atau tabel/gambar yang keluar dari pusat. Tidak ada tinta yang menyentuh
tepi; margin render minimum 106 piksel.

Audit pertama menemukan Lampiran B pada halaman fisik 545 terbalik 180 derajat.
`source/back.tex` diperbaiki dari rotasi `90` menjadi `-90`, manifest dan build
diulang penuh, lalu PDF terbaru dirender ulang. Lampiran B kini tegak, terpusat,
terbaca penuh, dan tidak terpotong; margin tintanya 106/117 piksel kiri/kanan
dan 522/426 piksel atas/bawah pada render 144 dpi. Halaman fisik 12 adalah verso
kosong warisan yang masih memuat running head `PRAKATA` dan folio `x`; ini
terbaca dan tidak menjadi penghalang rilis.

## Batas publikasi

Laporan ini menyatakan penutupan teknis buku utama dan batas GFDL/komponen yang
direkam dalam receipt terkait. Suplemen jawaban bernomor ganjil resmi tahun
2008 tetap internal-only dan tidak termasuk dalam artefak publik atau backend
publik. Tidak ada kontak dengan penulis selama produksi.
