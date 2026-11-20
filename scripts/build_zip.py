#!/usr/bin/env python3
"""
Packages the extension into a clean ZIP file for Chrome Web Store upload.
Excludes git, docs, tests, scripts, and temporary files.
"""

import os
import zipfile

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_ZIP = os.path.join(BASE_DIR, "network_plugin_plus.zip")

INCLUDE_FILES = [
    "manifest.json",
]

INCLUDE_DIRS = [
    "_locales",
    "icons",
    "src",
]

def make_zip():
    if os.path.exists(OUTPUT_ZIP):
        os.remove(OUTPUT_ZIP)

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
        # Add root files
        for f in INCLUDE_FILES:
            fp = os.path.join(BASE_DIR, f)
            if os.path.exists(fp):
                zf.write(fp, f)
                print(f"Added {f}")

        # Add directories
        for d in INCLUDE_DIRS:
            dp = os.path.join(BASE_DIR, d)
            if os.path.exists(dp):
                for root, _, files in os.walk(dp):
                    for file in files:
                        if file.startswith(".") or file.endswith(".swp"):
                            continue
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, BASE_DIR)
                        zf.write(full_path, rel_path)
                        print(f"Added {rel_path}")

    print(f"\nSuccessfully generated store-ready package: {OUTPUT_ZIP}")
    print(f"Size: {os.path.getsize(OUTPUT_ZIP):,} bytes")

if __name__ == "__main__":
    make_zip()
