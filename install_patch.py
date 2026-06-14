#!/usr/bin/env python3
"""
Green Coffee Feature Selector patch installer.

How to use:
1) Put this file in your project root, next to package.json.
2) Put the patch zip in the same folder. Default name: green-coffee-feature-patch.zip
3) Run: py install_patch.py

The installer:
- extracts the patch zip
- backs up overwritten files into .patch-backups/
- copies patched files into your project
- removes node_modules so broken Vite permissions do not survive
- runs npm install
"""

from __future__ import annotations

import argparse
import datetime as _dt
import os
import shutil
import stat
import subprocess
import sys
import zipfile
from pathlib import Path

PATCH_DEFAULT_NAME = "green-coffee-feature-patch.zip"
EXTRACT_DIR_NAME = ".green-coffee-patch-extracted"
BACKUP_DIR_NAME = ".patch-backups"


def log(message: str) -> None:
    print(f"[patch] {message}")


def fail(message: str, exit_code: int = 1) -> None:
    print(f"[patch] ERROR: {message}", file=sys.stderr)
    raise SystemExit(exit_code)


def on_rm_error(func, path, exc_info):
    """Make read-only files writable, then retry deletion. Useful on Windows."""
    try:
        os.chmod(path, stat.S_IWRITE)
        func(path)
    except Exception:
        raise


def find_patch_zip(root: Path, explicit: str | None) -> Path:
    if explicit:
        candidate = (root / explicit).resolve() if not Path(explicit).is_absolute() else Path(explicit)
        if candidate.exists():
            return candidate
        fail(f"Patch zip not found: {candidate}")

    preferred = root / PATCH_DEFAULT_NAME
    if preferred.exists():
        return preferred

    fallback = root / "patch.zip"
    if fallback.exists():
        return fallback

    matches = sorted(root.glob("*patch*.zip"))
    matches = [p for p in matches if p.is_file()]
    if len(matches) == 1:
        return matches[0]
    if len(matches) > 1:
        names = ", ".join(p.name for p in matches)
        fail(f"Multiple patch zip files found: {names}. Rename the one you want to {PATCH_DEFAULT_NAME} or run with --patch filename.zip")

    fail(f"No patch zip found. Put {PATCH_DEFAULT_NAME} next to install_patch.py")


def safe_extract(zip_path: Path, target_dir: Path) -> None:
    target_dir_resolved = target_dir.resolve()
    with zipfile.ZipFile(zip_path, "r") as zf:
        for info in zf.infolist():
            dest = (target_dir / info.filename).resolve()
            if not str(dest).startswith(str(target_dir_resolved)):
                fail(f"Unsafe path in zip: {info.filename}")
        zf.extractall(target_dir)


def locate_files_dir(extract_dir: Path) -> Path:
    direct = extract_dir / "files"
    if direct.is_dir():
        return direct

    for child in extract_dir.iterdir():
        if child.is_dir() and (child / "files").is_dir():
            return child / "files"

    fail("Patch zip is invalid: could not find a 'files' folder inside it")


def iter_patch_files(files_dir: Path):
    for path in sorted(files_dir.rglob("*")):
        if path.is_file():
            yield path


def copy_patch_files(files_dir: Path, project_root: Path, backup_root: Path) -> int:
    copied = 0
    for source in iter_patch_files(files_dir):
        relative = source.relative_to(files_dir)
        if any(part in {"node_modules", ".git", BACKUP_DIR_NAME, EXTRACT_DIR_NAME} for part in relative.parts):
            log(f"Skipping unsafe/internal path: {relative}")
            continue

        destination = project_root / relative
        if destination.exists() and destination.is_file():
            backup_path = backup_root / relative
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(destination, backup_path)

        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        log(f"Installed {relative.as_posix()}")
        copied += 1
    return copied


def clean_dependencies(project_root: Path) -> None:
    node_modules = project_root / "node_modules"
    if node_modules.exists():
        log("Removing node_modules to avoid broken Vite/Rollup permissions from old zips...")
        shutil.rmtree(node_modules, onerror=on_rm_error)


def run_npm_install(project_root: Path) -> None:
    npm_cmd = shutil.which("npm.cmd") if os.name == "nt" else shutil.which("npm")
    if not npm_cmd:
        log("npm was not found. Patch files were installed, but dependencies were not installed.")
        log("Run this manually after installing Node.js: npm install")
        return

    log("Running npm install...")
    subprocess.run([npm_cmd, "install"], cwd=project_root, check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Install the Green Coffee patch into the current project.")
    parser.add_argument("--patch", help="Patch zip filename/path. Default: green-coffee-feature-patch.zip")
    parser.add_argument("--skip-install", action="store_true", help="Copy files only; do not run npm install.")
    parser.add_argument("--skip-clean-deps", action="store_true", help="Do not remove node_modules before npm install.")
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent
    log(f"Project root: {project_root}")

    if not (project_root / "package.json").exists():
        fail("package.json was not found. Put install_patch.py in the project root directory.")

    patch_zip = find_patch_zip(project_root, args.patch)
    log(f"Using patch zip: {patch_zip.name}")

    extract_dir = project_root / EXTRACT_DIR_NAME
    if extract_dir.exists():
        shutil.rmtree(extract_dir, onerror=on_rm_error)
    extract_dir.mkdir(parents=True, exist_ok=True)

    log(f"Extracting patch to: {extract_dir.name}")
    safe_extract(patch_zip, extract_dir)

    files_dir = locate_files_dir(extract_dir)
    timestamp = _dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_root = project_root / BACKUP_DIR_NAME / f"green-coffee-patch-{timestamp}"
    backup_root.mkdir(parents=True, exist_ok=True)

    copied = copy_patch_files(files_dir, project_root, backup_root)
    if copied == 0:
        fail("No files were installed from the patch zip")

    log(f"Backup saved to: {backup_root.relative_to(project_root)}")

    if not args.skip_clean_deps:
        clean_dependencies(project_root)

    if not args.skip_install:
        run_npm_install(project_root)
    else:
        log("Skipped npm install because --skip-install was used.")

    log("Patch installed successfully.")
    log("Recommended next command: npm run build")


if __name__ == "__main__":
    main()
