#!/usr/bin/env python3
"""Generate and verify the bounded 140-file main-book input manifest."""

from __future__ import annotations

import hashlib
import os
import argparse
import stat
import uuid
from pathlib import Path


LANE = Path(__file__).resolve().parents[1]
LIVE = LANE / "source"
ISOLATED = LANE / "qa" / "main-book-closure-v3" / "source"
OUTPUT = LANE / "qa" / "MAIN_BOOK_FINAL_INPUT_MANIFEST.tsv"

TEXT_INPUTS = [
    "prob.tex",
    "front.tex",
    "preface.tex",
    "publication.tex",
    "history.tex",
    *(f"ch{number}.tex" for number in range(1, 13)),
    "back.tex",
    "gfdl.tex",
    "LICENSES/GFDL-1.3.txt",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def atomic_write(path: Path, payload: bytes) -> None:
    temporary = path.with_name(path.name + "." + uuid.uuid4().hex + ".tmp")
    flags = os.O_CREAT | os.O_EXCL | os.O_WRONLY | getattr(os, "O_BINARY", 0)
    descriptor = os.open(temporary, flags, 0o600)
    try:
        if not stat.S_ISREG(os.fstat(descriptor).st_mode):
            raise OSError("temporary manifest target is not a regular file")
        offset = 0
        while offset < len(payload):
            written = os.write(descriptor, payload[offset:])
            if written <= 0:
                raise OSError("short write while creating input manifest")
            offset += written
        os.fsync(descriptor)
    except Exception:
        os.close(descriptor)
        temporary.unlink(missing_ok=True)
        raise
    else:
        os.close(descriptor)
        os.replace(temporary, path)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--verify-copy",
        type=Path,
        default=ISOLATED if ISOLATED.is_dir() else None,
        help="optional second source root that must match every input byte-for-byte",
    )
    parser.add_argument("--output", type=Path, default=OUTPUT)
    arguments = parser.parse_args()

    figure_paths = [
        path.relative_to(LIVE).as_posix()
        for path in (LIVE / "figures").iterdir()
        if path.is_file()
    ]
    relative_paths = sorted(TEXT_INPUTS + figure_paths, key=str.casefold)
    if len(relative_paths) != 140 or len(figure_paths) != 120:
        raise SystemExit(
            f"unexpected input closure: {len(relative_paths)} total, "
            f"{len(figure_paths)} figures"
        )

    lines = ["sha256\tbytes\trelative_path\n"]
    total_bytes = 0
    for relative in relative_paths:
        live_path = LIVE / relative
        live_size = live_path.stat().st_size
        live_hash = sha256(live_path)
        if arguments.verify_copy is not None:
            isolated_path = arguments.verify_copy.resolve() / relative
            isolated_size = isolated_path.stat().st_size
            isolated_hash = sha256(isolated_path)
            if (live_size, live_hash) != (isolated_size, isolated_hash):
                raise SystemExit(f"live/isolated mismatch: {relative}")
        total_bytes += live_size
        lines.append(f"{live_hash}\t{live_size}\t{relative}\n")

    if total_bytes != 9_500_177:
        raise SystemExit(f"unexpected byte total: {total_bytes}")

    payload = "".join(lines).encode("utf-8")
    output_path = arguments.output.resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    atomic_write(output_path, payload)

    print(f"files={len(relative_paths)}")
    print(f"bytes={total_bytes}")
    print(f"manifest_bytes={len(payload)}")
    print(f"manifest_sha256={hashlib.sha256(payload).hexdigest()}")
    print(f"verified_copy={arguments.verify_copy is not None}")


if __name__ == "__main__":
    main()
