#!/usr/bin/env python3
"""Reproducibly package the official, pinned widget distribution for Salesforce."""
import base64
import hashlib
import io
import json
from pathlib import Path
import tarfile
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[2]
VERSION = "7.50.0"
INTEGRITY = "4gAsA9oxi+1W0t5dideEpBeZ79kjhYT6YB1rJVgQvLjvQQ89LjelqXYXoBlVn+p0yko4rYJ0y/CzYjZE72euyw=="
URL = f"https://registry.npmjs.org/@okta/okta-signin-widget/-/okta-signin-widget-{VERSION}.tgz"
DESTINATION = ROOT / "force-app/main/default/staticresources/oktaSignInWidget.resource"


def main():
    archive = urllib.request.urlopen(URL, timeout=60).read()
    actual = base64.b64encode(hashlib.sha512(archive).digest()).decode()
    if actual != INTEGRITY:
        raise ValueError("Widget archive integrity does not match the pinned release")
    files = {}
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as source:
        for member in source.getmembers():
            path = member.name
            if not member.isfile():
                continue
            if path in ("package/LICENSE", "package/THIRD-PARTY-NOTICES"):
                target = path.removeprefix("package/")
            elif path in (
                "package/dist/js/okta-sign-in.no-polyfill.min.js",
                "package/dist/css/okta-sign-in.min.css",
            ) or path.startswith(("package/dist/font/", "package/dist/img/")):
                target = path.removeprefix("package/dist/")
            else:
                continue
            files[target] = source.extractfile(member).read()
    for name in ("customer-mark.svg", "preview-overrides.css", "preview.html", "preview.js", "preview.css"):
        files[name] = (Path(__file__).parent / name).read_bytes()
    files["manifest.json"] = json.dumps({
        "package": "@okta/okta-signin-widget", "version": VERSION,
        "archive": URL, "integrity": "sha512-" + INTEGRITY,
        "mode": "display-only Classic preview; authentication disabled",
    }, indent=2).encode()
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(DESTINATION, "w", zipfile.ZIP_DEFLATED) as destination:
        for name, content in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 10, 2, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            destination.writestr(info, content)
    print(f"Packaged widget {VERSION}: {DESTINATION.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
