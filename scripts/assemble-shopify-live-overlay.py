#!/usr/bin/env python3
"""Build the theme that can be pushed onto the live Shopify theme.

The live shop already has product, cart, collection, and content pages.
This overlay keeps that theme and replaces only the homepage with the V2 design.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
V2 = ROOT / "shopify-theme"
OUT = ROOT / "shopify-live-overlay"

SECTION_FILES = (
    "banner.liquid",
    "logo-slider.liquid",
    "partner.liquid",
)

ASSET_FILES = (
    "base.css",
    "header.js",
    "banner-devices.png",
    "partner-devices.png",
    "inter-latin.woff2",
    "logo-jr.png",
    "logo-jr-black.png",
)

REQUIRED = (
    "layout/theme.liquid",
    "templates/index.json",
    "templates/product.json",
    "templates/cart.json",
    "templates/collection.json",
    "templates/page.contact.json",
    "sections/header.liquid",
    "sections/footer.liquid",
    "sections/main-product.liquid",
    "sections/main-cart.liquid",
    "sections/banner.liquid",
    "snippets/header-v2.liquid",
    "snippets/footer-v2.liquid",
    "snippets/logo-mark.liquid",
    "assets/base.css",
    "assets/jr.css",
)


def git_ref() -> str:
    for ref in ("origin/main", "main"):
        probe = subprocess.run(
            ["git", "rev-parse", "--verify", ref],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        if probe.returncode == 0:
            return ref
    raise SystemExit("Could not find main. Fetch it before assembling the live theme.")


def git_show(ref: str, path: str) -> str:
    return subprocess.check_output(
        ["git", "show", f"{ref}:{path}"],
        cwd=ROOT,
        text=True,
    )


def extract_main_theme(ref: str) -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    with tempfile.TemporaryDirectory() as tmp:
        archive = subprocess.check_output(
            ["git", "archive", ref, "shopify-theme"],
            cwd=ROOT,
        )
        subprocess.run(
            ["tar", "-x", "-C", tmp],
            input=archive,
            check=True,
        )
        shutil.move(str(Path(tmp) / "shopify-theme"), OUT)


def strip_schema(source: str) -> str:
    start = source.find("{% schema %}")
    if start == -1:
        return source.rstrip() + "\n"
    return source[:start].rstrip() + "\n"


def homepage_layout(v2_layout: str, main_layout: str) -> str:
    return (
        "{% comment %}\n"
        "  Homepage renders the V2 design.\n"
        "  Every other template keeps the existing shop.\n"
        "{% endcomment %}\n"
        "{% if template.name == 'index' %}\n"
        f"{v2_layout.strip()}\n"
        "{% else %}\n"
        f"{main_layout.strip()}\n"
        "{% endif %}\n"
    )


def merge_locale(base: object, overlay: object) -> object:
    if isinstance(base, dict) and isinstance(overlay, dict):
        merged = dict(base)
        for key, value in overlay.items():
            if key in merged:
                merged[key] = merge_locale(merged[key], value)
            else:
                merged[key] = value
        return merged
    return overlay


def main() -> None:
    ref = git_ref()
    extract_main_theme(ref)

    index_liquid = OUT / "templates" / "index.liquid"
    if index_liquid.exists():
        index_liquid.unlink()

    for name in SECTION_FILES:
        shutil.copy2(V2 / "sections" / name, OUT / "sections" / name)

    header = strip_schema((V2 / "sections" / "header.liquid").read_text())
    footer = strip_schema((V2 / "sections" / "footer.liquid").read_text())
    (OUT / "snippets" / "header-v2.liquid").write_text(header)
    (OUT / "snippets" / "footer-v2.liquid").write_text(footer)
    shutil.copy2(V2 / "snippets" / "logo-mark.liquid", OUT / "snippets" / "logo-mark.liquid")

    for name in ASSET_FILES:
        shutil.copy2(V2 / "assets" / name, OUT / "assets" / name)

    shutil.copy2(V2 / "templates" / "index.json", OUT / "templates" / "index.json")

    v2_layout = (V2 / "layout" / "theme.liquid").read_text()
    v2_layout = v2_layout.replace("{% section 'header' %}", "{% render 'header-v2' %}")
    v2_layout = v2_layout.replace("{% section 'footer' %}", "{% render 'footer-v2' %}")
    main_layout = git_show(ref, "shopify-theme/layout/theme.liquid")
    (OUT / "layout" / "theme.liquid").write_text(homepage_layout(v2_layout, main_layout))

    locale_path = OUT / "locales" / "nl.default.json"
    current = json.loads(locale_path.read_text())
    incoming = json.loads((V2 / "locales" / "nl.default.json").read_text())
    locale_path.write_text(
        json.dumps(merge_locale(current, incoming), ensure_ascii=False, indent=2) + "\n"
    )

    missing = [path for path in REQUIRED if not (OUT / path).exists()]
    if missing:
        raise SystemExit("Live overlay is incomplete:\n" + "\n".join(missing))

    layout = (OUT / "layout" / "theme.liquid").read_text()
    if layout.count("content_for_header") < 2 or "header-v2" not in layout:
        raise SystemExit("Homepage layout was not assembled.")
    if (OUT / "templates" / "index.liquid").exists():
        raise SystemExit("Old homepage template is still in the overlay.")
    if (OUT / "sections" / "header.liquid").read_text().find("jr-header") == -1:
        raise SystemExit("Existing header was overwritten.")

    print(f"Assembled live theme in {OUT}")


if __name__ == "__main__":
    main()
