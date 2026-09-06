# Pengantar Peluang Grinstead dan Snell — Bahasa Indonesia

Edisi Bahasa Indonesia lengkap dari versi GNU 2006 *Grinstead and Snell's
Introduction to Probability*. Repositori ini menyediakan sumber LaTeX
transparan, 120 gambar PostScript, PDF pembaca, backend modular lintas bahasa,
dan bukti QA yang dapat diputar ulang.

## Baca

[Baca langsung di pembaca web](https://kokunoyumeto.github.io/introduction-to-probability-id/)

[Unduh PDF edisi Bahasa Indonesia](release/PENGANTAR_PELUANG_GRINSTEAD_SNELL_ID.pdf)

[Kembali ke Program Matematika Indonesia — kursus B90](https://kokunoyumeto.github.io/program-matematika-indonesia/id/#course-B90)

[Sumber asli resmi versi GNU 2006 — The CHANCE Project](https://math.dartmouth.edu/~prob/prob/prob.tar.gz)

PDF final memuat 554 halaman Letter, seluruh 12 bab, tiga lampiran, indeks,
GNU FDL 1.3, pemberitahuan modifikasi, dan bagian `Riwayat (History)`.
Pembaca web menampilkan halaman secara terpusat dan selebar ruang baca,
menyediakan daftar isi, pencarian teks, navigasi halaman, perbesaran, rotasi,
tautan langsung per halaman, dan fallback PDF. Runtime PDF.js disimpan di
repositori agar pembaca tidak bergantung pada CDN atau analitik pihak ketiga.

## Struktur

- `source/` — sumber transparan Bahasa Indonesia dan seluruh gambar yang
  diperlukan untuk build;
- `backend/public/` — ekspor modular locale-neutral yang dapat dipakai untuk
  memilih unit, konsep, istilah, latihan, dan segmen terjemahan secara mesin;
  ekspor publik mempertahankan locator/hash sumber tetapi tidak menerbitkan
  ulang teks ekspresi sumber Inggris;
- `qa/` — manifest input dan receipt validasi final yang dipilih secara bounded;
- `release/` — PDF pembaca yang terikat hash.
- `index.html` dan `assets/` — pembaca web statis untuk GitHub Pages; PDF.js
  berlisensi Apache-2.0 dan tidak mengubah lisensi buku.

Petunjuk build terdapat di [BUILD.md](BUILD.md).

## Pemeriksaan terminologi 2026-08-22

Pencarian arXiv tidak menemukan naskah teori peluang berbahasa Indonesia
dengan TeX yang sesuai; sumber arXiv:1706.07786 diperiksa tetapi prosa TeX-nya
berbahasa Inggris. Fallback lapangan yang dipakai adalah *Teori Peluang*
(Universitas Lambung Mangkurat, 2021). Bukti itu menguatkan `distribusi
peluang`, yang diterapkan pada enam bentuk tidak konsisten di Bab 10 tanpa
perubahan matematika. Identitas sumber, hash, perbandingan istilah, dan alasan
keputusan ada di `qa/terminology-arxiv-qa/TERMINOLOGY_QA_REPORT.md`; PDF
referensi eksternal tidak disertakan dalam rilis.

## Hak dan atribusi

Penulis asli: Charles M. Grinstead dan J. Laurie Snell. Versi GNU 2006:
Peter G. Doyle / The CHANCE Project. Terjemahan dan modifikasi Bahasa
Indonesia: KokunoYumeto, dengan bantuan Codex atas permintaan KokunoYumeto.
Penerbit edisi ini: KokunoYumeto.

OpenAI Codex gpt-5.6-sol, Ultra.

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
