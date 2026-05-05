import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { getAllVariants } from "./imageLibrary";

const VALID_TAGS = [
  "food-macro",
  "storybook-illustration",
  "anime-still",
  "kawaii-plushie",
  "kawaii-illustration",
  "open-sky",
  "cosy-object",
  "abstract-art",
  "nature-closeup",
  "collage-bright",
  "dark-artwork",
  "soft-textile",
  "garden-closeup",
  "open-water",
];

const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "affirmations");

const variants = getAllVariants();

describe("Image Library — Layer 1 Smoke Test", () => {
  it("has at least one variant for all 14 tags", () => {
    const presentTags = new Set(variants.map((v) => v.tag));
    for (const tag of VALID_TAGS) {
      expect(presentTags.has(tag), `Missing tag: ${tag}`).toBe(true);
    }
  });

  it("has no unknown tags", () => {
    for (const v of variants) {
      expect(VALID_TAGS, `Unknown tag: ${v.tag}`).toContain(v.tag);
    }
  });

  describe("per-variant checks", () => {
    for (const v of variants) {
      describe(`${v.tag} / ${v.file.split("/").pop()}`, () => {
        it("file exists on disk (no 404)", () => {
          const filePath = path.join(PUBLIC_DIR, v.file);
          expect(
            fs.existsSync(filePath),
            `Missing file: public/images/affirmations/${v.file}`
          ).toBe(true);
        });

        it("textColour is a valid value", () => {
          expect(["black", "white", "white+outline"]).toContain(v.textColour);
        });

        it("textPosition is a valid value", () => {
          expect(["top", "middle", "right"]).toContain(v.textPosition);
        });

        it("white+outline entries have accentColour defined", () => {
          if (v.textColour === "white+outline") {
            expect(
              v.accentColour,
              `${v.file} is white+outline but missing accentColour`
            ).toBeTruthy();
          }
        });
      });
    }
  });
});
