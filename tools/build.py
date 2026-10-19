"""Assemble le site en un seul fichier autonome : dist/ATYPIIK.html.

Usage : python3 tools/build.py
Le fichier généré s'ouvre d'un double-clic, sans serveur.
"""
import base64
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")

css = "".join((root / "css" / f).read_text(encoding="utf-8") for f in ("theme.css", "style.css"))
js = "".join((root / "js" / f).read_text(encoding="utf-8") for f in ("data.js", "photos.js", "app.js"))

html = re.sub(r'\s*<link rel="stylesheet" href="css/theme.css" />\s*<link rel="stylesheet" href="css/style.css" />',
              lambda _: f"\n    <style>\n{css}\n    </style>", html)
html = re.sub(r'\s*<script src="js/data.js"></script>\s*<script src="js/photos.js"></script>\s*<script src="js/app.js"></script>',
              lambda _: f"\n    <script>\n{js}\n    </script>", html)

# Les photos référencées dans le code (assets/photos/…) sont intégrées en base64
# pour que le fichier reste autonome.
def inline_photo(m):
    path = root / m.group(1)
    if not path.exists():
        return m.group(0)
    mime = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
    return '"data:%s;base64,%s"' % (mime, base64.b64encode(path.read_bytes()).decode())

html = re.sub(r'"(assets/photos/[^"]+\.(?:jpe?g|png))"', inline_photo, html)

out = root / "dist" / "ATYPIIK.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"OK -> {out.relative_to(root)} ({out.stat().st_size // 1024} Ko)")
