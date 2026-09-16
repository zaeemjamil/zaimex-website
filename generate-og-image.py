"""
Generates the Open Graph / social preview image (1200x630) using the real
ZAIMEX logo mark — not generated abstract art. Run with:
  python3 scripts/generate-og-image.py
Requires: Pillow.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BRAND_DIR = ROOT / "public" / "brand"
OUT = ROOT / "public" / "images" / "brand" / "og-cover.png"

INK = (10, 13, 18)
ACCENT = (115, 112, 255)  # brand blue, dark-background tint (#7370ff) — matches --zx-brand-blue-bright
MUTED = (138, 146, 160)

MANROPE_BOLD = ROOT / "node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2"
INTER_REGULAR = ROOT / "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2"

WIDTH, HEIGHT = 1200, 630


def main() -> None:
    canvas = Image.new("RGB", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(canvas)

    # Logo mark (white-on-transparent — the dark-theme variant, matching this canvas).
    logo = Image.open(BRAND_DIR / "zaimex-logo-dark.png")
    logo_height = 108
    logo_width = round(logo.width * (logo_height / logo.height))
    logo = logo.resize((logo_width, logo_height), Image.LANCZOS)

    left = 90
    logo_top = 150
    canvas.paste(logo, (left, logo_top), logo)

    # Wordmark
    wordmark_font = ImageFont.truetype(str(MANROPE_BOLD), 64)
    wordmark_y = logo_top + logo_height + 38
    draw.text((left, wordmark_y), "ZAIMEX", font=wordmark_font, fill=(255, 255, 255))

    # Tagline
    tagline_font = ImageFont.truetype(str(INTER_REGULAR), 30)
    tagline_y = wordmark_y + 82
    draw.text((left, tagline_y), "Data. AI. Automation. Built for Business.", font=tagline_font, fill=ACCENT)

    # Small supporting line, muted
    sub_font = ImageFont.truetype(str(INTER_REGULAR), 22)
    sub_y = tagline_y + 48
    draw.text(
        (left, sub_y),
        "Data Analytics  ·  Business Intelligence  ·  AI & Automation  ·  Digital Solutions",
        font=sub_font,
        fill=MUTED,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, optimize=True)
    print(f"Saved {OUT} ({canvas.size})")


if __name__ == "__main__":
    main()
