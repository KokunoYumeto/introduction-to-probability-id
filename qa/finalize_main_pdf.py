#!/usr/bin/env python3
"""Normalize R010 main-PDF metadata and validate the publication artifact."""

from __future__ import annotations

import argparse
import hashlib
import os
import stat
import uuid
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject


BUILD = Path(__file__).resolve().parent / "main-book-closure-v3" / "source"
EXPECTED_PAGES = 554
FIXED_METADATA = {
    "/Title": "Pengantar Peluang Grinstead dan Snell — Edisi Bahasa Indonesia",
    "/Author": "Charles M. Grinstead dan J. Laurie Snell; edisi Indonesia oleh KokunoYumeto",
    "/Subject": "Buku pengantar teori peluang, edisi Bahasa Indonesia",
    "/Keywords": "peluang, probabilitas, matematika, Bahasa Indonesia",
    "/Creator": "LaTeX/dvips; edisi Bahasa Indonesia oleh KokunoYumeto dengan bantuan Codex",
    "/Producer": "MiKTeX GPL Ghostscript 9.25; metadata dinormalisasi dengan pypdf 6.12.2",
    "/CreationDate": "D:20260821000000+02'00'",
    "/ModDate": "D:20260821000000+02'00'",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def confined(build: Path, name: str) -> Path:
    if Path(name).name != name or not name.lower().endswith(".pdf"):
        raise SystemExit(f"expected one PDF basename, got {name!r}")
    return build / name


def all_fonts_embedded(reader: PdfReader) -> tuple[int, int]:
    fonts: dict[str, object] = {}
    for page in reader.pages:
        resources = page.get("/Resources", {})
        for reference in (resources.get("/Font", {}) or {}).values():
            font = reference.get_object()
            fonts[str(font.get("/BaseFont"))] = font

    embedded = 0
    for font in fonts.values():
        descriptor = font.get("/FontDescriptor")
        descriptor = descriptor.get_object() if descriptor else {}
        if any(key in descriptor for key in ("/FontFile", "/FontFile2", "/FontFile3")):
            embedded += 1
    return len(fonts), embedded


def write_pdf_to_temporary(writer: PdfWriter, path: Path) -> Path:
    temporary = path.with_name(path.name + "." + uuid.uuid4().hex + ".tmp")
    flags = os.O_CREAT | os.O_EXCL | os.O_WRONLY | getattr(os, "O_BINARY", 0)
    descriptor = os.open(temporary, flags, 0o600)
    try:
        if not stat.S_ISREG(os.fstat(descriptor).st_mode):
            raise OSError("temporary PDF target is not a regular file")
        with os.fdopen(descriptor, "wb", closefd=True) as destination:
            descriptor = -1
            writer.write(destination)
            destination.flush()
            os.fsync(destination.fileno())
    except Exception:
        if descriptor >= 0:
            os.close(descriptor)
        temporary.unlink(missing_ok=True)
        raise
    return temporary


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--build-dir", type=Path, default=BUILD)
    parser.add_argument("--input", default="prob-publication.pdf")
    parser.add_argument("--output", default="prob-final.pdf")
    arguments = parser.parse_args()

    build = arguments.build_dir.resolve()
    if not build.is_dir():
        raise SystemExit(f"build directory does not exist: {build}")
    input_path = confined(build, arguments.input)
    output_path = confined(build, arguments.output)
    if input_path.resolve() == output_path.resolve():
        raise SystemExit("input and output PDF paths must differ")
    reader = PdfReader(input_path, strict=True)
    if reader.is_encrypted or len(reader.pages) != EXPECTED_PAGES:
        raise SystemExit("unexpected encryption or page count")
    for number, page in enumerate(reader.pages, start=1):
        box = page.mediabox
        if abs(float(box.width) - 612.0) > 0.01 or abs(float(box.height) - 792.0) > 0.01:
            raise SystemExit(f"page {number} is not Letter size")

    writer = PdfWriter(clone_from=reader)
    writer.pdf_header = b"%PDF-1.4"
    writer.metadata = None
    writer.add_metadata(FIXED_METADATA)
    writer.root_object.pop(NameObject("/Metadata"), None)
    writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    writer._ID = None
    writer.generate_file_identifiers()

    temporary = write_pdf_to_temporary(writer, output_path)
    try:
        with temporary.open("rb") as candidate_stream:
            final = PdfReader(candidate_stream, strict=True)
            total_fonts, embedded_fonts = all_fonts_embedded(final)
            final_pages = len(final.pages)
            if final_pages != EXPECTED_PAGES or (total_fonts, embedded_fonts) != (36, 36):
                raise SystemExit(
                    f"final validation failed: pages={final_pages}, "
                    f"fonts={total_fonts}, embedded={embedded_fonts}"
                )
            metadata = dict(final.metadata or {})
            for key, value in FIXED_METADATA.items():
                if metadata.get(key) != value:
                    raise SystemExit(f"metadata mismatch for {key}")
        os.replace(temporary, output_path)
    except BaseException:
        temporary.unlink(missing_ok=True)
        raise

    print(f"input_sha256={sha256(input_path)}")
    print(f"output_bytes={output_path.stat().st_size}")
    print(f"output_sha256={sha256(output_path)}")
    print(f"pages={final_pages}")
    print(f"fonts={total_fonts}")
    print(f"embedded_fonts={embedded_fonts}")


if __name__ == "__main__":
    main()
