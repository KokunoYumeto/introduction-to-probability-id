# Build buku utama

## Lingkungan yang divalidasi

- Windows 11;
- MiKTeX 26.5 (`latex`, `makeindex`, `dvips`, `mgs`);
- Python 3 dengan `pypdf==6.12.2` untuk normalisasi metadata final;
- semua input berada di `source/` dan tercantum dalam
  `qa/MAIN_BOOK_FINAL_INPUT_MANIFEST.tsv`.

## Pipeline

Bekerjalah dalam salinan terisolasi dari `source/`; jangan menulis file bantu
build ke sumber hidup.

```powershell
$env:SOURCE_DATE_EPOCH = '1780000000'
$env:FORCE_SOURCE_DATE = '1'
latex -interaction=nonstopmode -halt-on-error prob.tex
makeindex prob.idx
latex -interaction=nonstopmode -halt-on-error prob.tex
latex -interaction=nonstopmode -halt-on-error prob.tex
dvips -Ppdf -G0 -o prob.ps prob.dvi
mgs --% -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dEmbedAllFonts=true -dSubsetFonts=true -dPDFSETTINGS=/prepress -sFONTPATH=C:\Windows\Fonts -sOutputFile=prob-publication.pdf prob.ps
```

Normalisasi metadata/ID PDF dengan `qa/finalize_main_pdf.py`. Berikan direktori
build Anda melalui `--build-dir`; opsi nama input/output hanya menerima basename
PDF di direktori tersebut. Jika opsi itu dihilangkan dalam checkout pengembang,
skrip memakai build QA terisolasi `qa/main-book-closure-v3/source`. Skrip
menolak input dan output yang sama, memvalidasi PDF sementara sebelum penggantian
atomik, dan menghapus file sementara jika validasi gagal.

```powershell
python qa/finalize_main_pdf.py `
  --build-dir path\to\isolated-build `
  --input prob-publication.pdf `
  --output prob-final.pdf
```

Hasil yang dibuktikan pada 2026-08-21:

- 554 halaman Letter;
- 3.403.297 byte;
- SHA-256 `531fd89180fe759056c4484020f855f9e393317566ba62147a5a378b5b7cae2f`;
- 36/36 font tertanam;
- nol referensi/sitasi tak terdefinisi dan nol karakter hilang.

Jalankan `python qa/generate_main_input_manifest.py` untuk membuktikan bahwa
140 input build (20 file sumber/lisensi dan 120 gambar) sama byte demi byte
dengan salinan build terisolasi. Manifest final memuat 9.500.177 byte input.
