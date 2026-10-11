"""
Processes the official ZAIMEX logo artwork (public/brand/source/*.png) into
web-ready assets. This does NOT redraw, redesign, or alter the mark itself —
it only:
  1. Crops to the mark's tight bounding box (removes excess canvas padding)
  2. Makes the flat background colour transparent, so the mark blends into
     whatever surface it's placed on instead of carrying its own mismatched
     background tile
  3. Produces a square, padded, opaque icon variant for favicon/app-icon use
     (icons are always opaque tiles — the OS renders the surrounding shape)

Run with: python3 scripts/process-logo.py
Requires: Pillow (`pip install pillow --break-system-packages`)
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public" / "brand" / "source"
OUT_DIR = ROOT / "public" / "brand"

BLUE = (27, 23, 255)
WHITE = (255, 255, 255)


def bounding_box(img: Image.Image, bg: tuple[int, int, int]) -> tuple[int, int, int, int]:
    """Tight bounding box of everything that isn't (approximately) `bg`."""
    rgb = img.convert("RGB")
    diff = Image.eval(
        Image.merge(
            "RGB",
            [rgb.getchannel(c).point(lambda v, b=bg[i]: abs(v - b)) for i, c in enumerate("RGB")],
        ).convert("L"),
        lambda v: 255 if v > 8 else 0,
    )
    bbox = diff.getbbox()
    if not bbox:
        raise ValueError("Could not find any non-background pixels — check the background colour.")
    return bbox


def make_transparent(img: Image.Image, bg: tuple[int, int, int], fg: tuple[int, int, int]) -> Image.Image:
    """Returns an RGBA copy with `bg` removed to transparency.

    The source art is flat `fg` on flat `bg` with a few anti-aliased edge
    pixels that are a blend of the two. Rather than thresholding those edge
    pixels as fully one colour or the other (which leaves a jagged or
    colour-fringed line), this solves each pixel as `t*fg + (1-t)*bg` and
    outputs the pure `fg` colour at alpha `t` — a clean, fringe-free edge.
    """
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    # Channel with the largest fg/bg difference gives the most reliable blend estimate.
    channel = max(range(3), key=lambda i: abs(fg[i] - bg[i]))
    span = fg[channel] - bg[channel]

    for y in range(rgba.height):
        for x in range(rgba.width):
            px = pixels[x, y]
            t = (px[channel] - bg[channel]) / span
            t = max(0.0, min(1.0, t))
            alpha = round(t * 255)
            pixels[x, y] = (fg[0], fg[1], fg[2], alpha) if alpha > 0 else (bg[0], bg[1], bg[2], 0)
    return rgba


def process_variant(source_name: str, bg: tuple[int, int, int], fg: tuple[int, int, int], out_name: str, margin_ratio: float = 0.035) -> tuple[int, int, int, int]:
    img = Image.open(SRC_DIR / source_name)
    bbox = bounding_box(img, bg)
    cropped = img.crop(bbox)
    transparent = make_transparent(cropped, bg, fg)

    # Small uniform safety margin so the mark doesn't touch the exact pixel
    # edge of the file (still a tight crop overall — not the original's
    # much larger canvas padding).
    margin = round(max(transparent.width, transparent.height) * margin_ratio)
    padded = Image.new("RGBA", (transparent.width + margin * 2, transparent.height + margin * 2), (0, 0, 0, 0))
    padded.paste(transparent, (margin, margin), transparent)
    padded.save(OUT_DIR / out_name, optimize=True)
    print(f"{out_name}: cropped to {padded.size} (mark {transparent.size} + {margin}px margin), bbox={bbox}")
    return bbox


def make_square_icon(source_name: str, bg: tuple[int, int, int], mark_bbox: tuple[int, int, int, int], out_name: str, pad_ratio: float = 0.12) -> None:
    """Square, opaque, padded tile for favicon/app-icon use (never transparent)."""
    img = Image.open(SRC_DIR / source_name).convert("RGB")
    mark = img.crop(mark_bbox)
    side = max(mark.width, mark.height)
    pad = int(side * pad_ratio)
    canvas_side = side + pad * 2
    canvas = Image.new("RGB", (canvas_side, canvas_side), bg)
    offset = ((canvas_side - mark.width) // 2, (canvas_side - mark.height) // 2)
    canvas.paste(mark, offset)
    canvas.save(OUT_DIR / out_name, optimize=True)
    print(f"{out_name}: {canvas.size}")


if __name__ == "__main__":
    light_bbox = process_variant("zaimex-logo-source-light.png", WHITE, BLUE, "zaimex-logo-light.png")
    dark_bbox = process_variant("zaimex-logo-source-dark.png", BLUE, WHITE, "zaimex-logo-dark.png")

    # Square icon tile uses the white-mark-on-blue source (an opaque blue
    # square reads better as a small app icon than a blue mark on white).
    make_square_icon("zaimex-logo-source-dark.png", BLUE, dark_bbox, "zaimex-logo-square.png")

    print("\nDone. Regenerate favicon/app icons next — see README 'Icons & Open Graph image'.")
