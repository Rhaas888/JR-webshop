#!/usr/bin/env python3
"""Fail the deploy when Shopify accepts the push but rejects theme files."""

from __future__ import annotations

import json
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: check-theme-push.py <push-log>")

    text = Path(sys.argv[1]).read_text()
    start = text.rfind('{"theme"')
    if start == -1:
        raise SystemExit("Shopify CLI did not return a theme result.")

    payload = json.loads(text[start:])
    theme = payload.get("theme", payload)
    errors = theme.get("errors")
    if errors:
        print(json.dumps(errors, indent=2))
        raise SystemExit("Shopify rejected one or more theme files.")

    name = theme.get("name", "theme")
    role = theme.get("role", "unknown")
    print(f"Uploaded {name} ({role}) without file errors.")


if __name__ == "__main__":
    main()
