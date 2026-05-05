import { Vibrant } from "node-vibrant/node";
import { readdir } from "fs/promises";
import { join } from "path";

const BASE = "public/images/affirmations";

const TAGS = [
  "food-macro",
  "kawaii-illustration",
  "open-sky",
  "abstract-art",
  "soft-textile",
  "dark-artwork",
  "anime-still",
  "garden-closeup",
  "collage-bright",
  "storybook-illustration",
  "kawaii-plushie",
  "cosy-object",
  "nature-closeup",
  "open-water",
];

for (const tag of TAGS) {
  const dir = join(BASE, tag);
  let files;
  try {
    files = (await readdir(dir))
      .filter((f) => f.endsWith(".jpg") || f.endsWith(".png"))
      .sort();
  } catch {
    console.log(`\n=== ${tag} === MISSING FOLDER`);
    continue;
  }

  console.log(`\n=== ${tag} (${files.length} images) ===`);

  for (const file of files) {
    const path = join(dir, file);
    try {
      const palette = await Vibrant.from(path).getPalette();
      const vibrant = palette.Vibrant;
      const darkVibrant = palette.DarkVibrant;
      const lightVibrant = palette.LightVibrant;
      const muted = palette.Muted;

      const dominant = vibrant || muted || darkVibrant || lightVibrant;
      const hex = dominant?.hex ?? "?";
      const darkHex = darkVibrant?.hex ?? "-";
      const lightHex = lightVibrant?.hex ?? "-";
      const vibrantHex = vibrant?.hex ?? "-";

      // Compute brightness of dominant swatch (0-255)
      const [r, g, b] = dominant?.rgb ?? [128, 128, 128];
      const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      const suggestion =
        brightness > 180
          ? "→ black text"
          : brightness < 80
            ? "→ white text"
            : "→ white+outline";

      console.log(
        `  ${file}: dominant=${hex} brightness=${brightness} ${suggestion} | vibrant=${vibrantHex} dark=${darkHex} light=${lightHex}`
      );
    } catch (e) {
      console.log(`  ${file}: ERROR ${e.message}`);
    }
  }
}
