"""Assemble le site en un seul fichier autonome : dist/ATYPIIK.html.

Usage : python3 tools/build.py
Le fichier généré s'ouvre d'un double-clic, sans serveur.
"""
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")

css = "".join((root / "css" / f).read_text(encoding="utf-8") for f in ("theme.css", "style.css"))
js = "".join((root / "js" / f).read_text(encoding="utf-8") for f in ("data.js", "app.js"))

html = re.sub(r'\s*<link rel="stylesheet" href="css/theme.css" />\s*<link rel="stylesheet" href="css/style.css" />',
              lambda _: f"\n    <style>\n{css}\n    </style>", html)
html = re.sub(r'\s*<script src="js/data.js"></script>\s*<script src="js/app.js"></script>',
              lambda _: f"\n    <script>\n{js}\n    </script>", html)

out = root / "dist" / "ATYPIIK.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"OK -> {out.relative_to(root)} ({out.stat().st_size // 1024} Ko)")
