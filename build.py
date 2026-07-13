#!/usr/bin/env python3
"""
Build script for the Stora landing page.

Why this exists: the page is split into small, editable partial files
under src/partials/ (one per section) so you can update the hero or
the features grid without scrolling through one giant HTML file.
This script stitches them into a single index.html — a plain static
file with no server, no JS-based includes, so it works exactly the
same on Netlify, Vercel, GitHub Pages, or opened directly in a browser.

Usage:
    python3 build.py

Run it every time you edit a file in src/partials/, then redeploy
(or just re-upload) index.html.
"""

import pathlib

ROOT = pathlib.Path(__file__).parent
SHELL = ROOT / "src" / "shell.html"
PARTIALS_DIR = ROOT / "src" / "partials"
OUTPUT = ROOT / "index.html"

MARKERS = {
    "<!--NAV-->": "_nav.html",
    "<!--HERO-->": "_hero.html",
    "<!--HOW_IT_WORKS-->": "_how_it_works.html",
    "<!--VIDEO-->": "_video.html",
    "<!--FEATURES-->": "_features.html",
    "<!--DISCLAIMER-->": "_disclaimer.html",
    "<!--FINAL_CTA_FOOTER-->": "_final_cta_footer.html",
}


def build():
    shell = SHELL.read_text(encoding="utf-8")

    for marker, filename in MARKERS.items():
        partial_path = PARTIALS_DIR / filename
        if not partial_path.exists():
            raise FileNotFoundError(f"Missing partial: {partial_path}")
        content = partial_path.read_text(encoding="utf-8")
        if marker not in shell:
            raise ValueError(f"Marker {marker} not found in shell.html")
        shell = shell.replace(marker, content)

    OUTPUT.write_text(shell, encoding="utf-8")
    print(f"Built {OUTPUT} ({len(shell)} bytes)")


if __name__ == "__main__":
    build()
