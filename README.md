# Pengantar Peluang Grinstead dan Snell — Bahasa Indonesia

Edisi Bahasa Indonesia lengkap dari versi GNU 2006 *Grinstead and Snell's
Introduction to Probability*. Repositori ini menyediakan sumber LaTeX
transparan, 120 gambar PostScript, PDF pembaca, backend modular lintas bahasa,
dan bukti QA yang dapat diputar ulang.

## Baca

[Unduh PDF edisi Bahasa Indonesia](release/PENGANTAR_PELUANG_GRINSTEAD_SNELL_ID.pdf)

PDF final memuat 554 halaman Letter, seluruh 12 bab, tiga lampiran, indeks,
GNU FDL 1.3, pemberitahuan modifikasi, dan bagian `Riwayat (History)`.

## Struktur

- `source/` — sumber transparan Bahasa Indonesia dan seluruh gambar yang
  diperlukan untuk build;
- `backend/public/` — ekspor modular locale-neutral yang dapat dipakai untuk
  memilih unit, konsep, istilah, latihan, dan segmen terjemahan secara mesin;
  ekspor publik mempertahankan locator/hash sumber tetapi tidak menerbitkan
  ulang teks ekspresi sumber Inggris;
- `qa/` — manifest input dan receipt validasi final yang dipilih secara bounded;
- `release/` — PDF pembaca yang terikat hash.

Petunjuk build terdapat di [BUILD.md](BUILD.md).

## Hak dan atribusi

Penulis asli: Charles M. Grinstead dan J. Laurie Snell. Versi GNU 2006:
Peter G. Doyle / The CHANCE Project. Terjemahan dan modifikasi Bahasa
Indonesia: KokunoYumeto, dengan bantuan Codex atas permintaan KokunoYumeto.
Penerbit edisi ini: KokunoYumeto.

Dokumen didistribusikan menurut GNU Free Documentation License 1.3 atau versi
lebih baru, tanpa Invariant Sections, Front-Cover Texts, atau Back-Cover Texts.
Pemberitahuan lengkap dan teks lisensi yang tidak diubah berada di dalam PDF
dan di `source/LICENSES/GFDL-1.3.txt`. Repositori ini tidak menyiratkan dukungan
oleh penulis/penerbit sumber.

Arsip otoritas tidak diduplikasi dalam rilis ini. Sumber GNU 2006 tersedia dari
[The CHANCE Project](https://math.dartmouth.edu/~prob/prob/prob.tar.gz), dan
setiap segmen backend publik mempertahankan locator serta hash otoritasnya.

## Batas suplemen jawaban

PDF resmi tahun 2008 yang memuat jawaban soal bernomor ganjil tidak menyatakan
lisensi penerjemahan atau distribusi ulang. Karena itu, draf terjemahan jawaban,
teks jawabannya, dan record backend yang mengandung jawabannya **tidak termasuk
dalam repositori publik ini**. Repositori hanya boleh menyebut status tersebut
dan menautkan [file Inggris resmi](https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/Answersodd-10-14-08.pdf).
