import type { TextColour, TextPosition } from "./types";

export interface ImageEntry {
  file: string;
  fallbackColor: string;
  textColour: TextColour;
  textPosition: TextPosition;
  backgroundPosition: string;
  accentColour?: string;
}

export interface PreviewVariant extends ImageEntry {
  tag: string;
}

interface ImageVariant {
  file: string;
  textColour: TextColour;
  textPosition: TextPosition;
  backgroundPosition?: string;
  accentColour?: string;
}

interface TagEntry {
  fallbackColor: string;
  variants: ImageVariant[];
}

const LIBRARY: Record<string, TagEntry> = {
  "food-macro": {
    fallbackColor: "#fff2b2",
    variants: [
      { file: "food-macro/food-macro-01.jpg", textColour: "black",        textPosition: "middle" },
      { file: "food-macro/food-macro-02.jpg", textColour: "white",        textPosition: "middle" },
      { file: "food-macro/food-macro-03.jpg", textColour: "white+outline",textPosition: "middle", accentColour: "#c63a26" },
      { file: "food-macro/food-macro-04.jpg", textColour: "white",        textPosition: "middle" },
      { file: "food-macro/food-macro-05.jpg", textColour: "black",        textPosition: "middle" },
    ],
  },
  "kawaii-illustration": {
    fallbackColor: "#fef9e7",
    variants: [
      { file: "kawaii-illustration/kawaii-illustration-01.jpg", textColour: "white", textPosition: "top" },
    ],
  },
  "open-sky": {
    fallbackColor: "#d6eaf8",
    variants: [
      { file: "open-sky/open-sky-01.jpg", textColour: "black", textPosition: "middle" },
      { file: "open-sky/open-sky-03.jpg", textColour: "black", textPosition: "middle", backgroundPosition: "center 100%" },
      { file: "open-sky/open-sky-04.jpg", textColour: "white", textPosition: "middle", backgroundPosition: "center 25%" },
      { file: "open-sky/open-sky-05.jpg", textColour: "white", textPosition: "middle" },
    ],
  },
  "abstract-art": {
    fallbackColor: "#f9f0ff",
    variants: [
      { file: "abstract-art/abstract-art-01.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#f6b909" },
      { file: "abstract-art/abstract-art-02.jpg", textColour: "white",         textPosition: "middle" },
      { file: "abstract-art/abstract-art-03.jpg", textColour: "white",         textPosition: "middle" },
    ],
  },
  "soft-textile": {
    fallbackColor: "#fff8d3",
    variants: [
      { file: "soft-textile/soft-textile-01.jpg", textColour: "white",         textPosition: "middle" },
      { file: "soft-textile/soft-textile-02.jpg", textColour: "white",         textPosition: "middle" },
      { file: "soft-textile/soft-textile-03.jpg", textColour: "white",         textPosition: "middle" },
      { file: "soft-textile/soft-textile-04.jpg", textColour: "white",         textPosition: "middle" },
      { file: "soft-textile/soft-textile-05.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#acac2c" },
    ],
  },
  "dark-artwork": {
    fallbackColor: "#2f0601",
    variants: [
      { file: "dark-artwork/dark-artwork-01.jpg", textColour: "white",         textPosition: "middle" },
      { file: "dark-artwork/dark-artwork-02.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#c49434" },
      { file: "dark-artwork/dark-artwork-03.jpg", textColour: "white",         textPosition: "middle" },
      { file: "dark-artwork/dark-artwork-04.jpg", textColour: "white",         textPosition: "middle" },
      { file: "dark-artwork/dark-artwork-05.jpg", textColour: "white",         textPosition: "middle" },
      { file: "dark-artwork/dark-artwork-06.jpg", textColour: "white",         textPosition: "middle" },
    ],
  },
  "anime-still": {
    fallbackColor: "#1a2a4a",
    variants: [
      { file: "anime-still/anime-still-01.jpg", textColour: "white",         textPosition: "middle" },
      { file: "anime-still/anime-still-02.jpg", textColour: "white",         textPosition: "middle" },
      { file: "anime-still/anime-still-03.jpg", textColour: "white",         textPosition: "middle" },
      { file: "anime-still/anime-still-04.jpg", textColour: "white",         textPosition: "middle" },
      { file: "anime-still/anime-still-05.jpg", textColour: "white+outline", textPosition: "top",    accentColour: "#b19122", backgroundPosition: "center 90%" },
    ],
  },
  "garden-closeup": {
    fallbackColor: "#1a3a1a",
    variants: [
      { file: "garden-closeup/garden-closeup-01.jpg", textColour: "white",         textPosition: "middle" },
      { file: "garden-closeup/garden-closeup-02.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#e58e10" },
      { file: "garden-closeup/garden-closeup-03.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#ad282d" },
      { file: "garden-closeup/garden-closeup-04.jpg", textColour: "white",         textPosition: "middle" },
      { file: "garden-closeup/garden-closeup-05.jpg", textColour: "white",         textPosition: "middle" },
    ],
  },
  "collage-bright": {
    fallbackColor: "#152e70",
    variants: [
      { file: "collage-bright/collage-bright-01.jpg", textColour: "white", textPosition: "top",    backgroundPosition: "center 75%" },
    ],
  },
  "storybook-illustration": {
    fallbackColor: "#e8d5c4",
    variants: [
      { file: "storybook-illustration/storybook-illustration-02.jpg", textColour: "white",         textPosition: "top" },
      { file: "storybook-illustration/storybook-illustration-03.jpg", textColour: "white+outline", textPosition: "top",   accentColour: "#cf883b" },
      { file: "storybook-illustration/storybook-illustration-04.jpg", textColour: "white",         textPosition: "top" },
      { file: "storybook-illustration/storybook-illustration-05.jpg", textColour: "white",         textPosition: "top",   backgroundPosition: "center 75%" },
    ],
  },
  "kawaii-plushie": {
    fallbackColor: "#fce4ec",
    variants: [
      { file: "kawaii-plushie/kawaii-plushie-01.jpg", textColour: "white", textPosition: "middle" },
      { file: "kawaii-plushie/kawaii-plushie-02.jpg", textColour: "white", textPosition: "top",    backgroundPosition: "center 50%" },
      { file: "kawaii-plushie/kawaii-plushie-03.jpg", textColour: "white", textPosition: "top",    backgroundPosition: "center 50%" },
      { file: "kawaii-plushie/kawaii-plushie-04.jpg", textColour: "white", textPosition: "middle" },
      { file: "kawaii-plushie/kawaii-plushie-05.jpg", textColour: "white", textPosition: "top",    backgroundPosition: "center 75%" },
      { file: "kawaii-plushie/kawaii-plushie-06.jpg", textColour: "white", textPosition: "top",    backgroundPosition: "center 0%" },
    ],
  },
  "cosy-object": {
    fallbackColor: "#d4e8d0",
    variants: [
      { file: "cosy-object/cosy-object-02.jpg", textColour: "white",         textPosition: "middle" },
      { file: "cosy-object/cosy-object-03.jpg", textColour: "white",         textPosition: "middle" },
      { file: "cosy-object/cosy-object-04.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#c4843c" },
      { file: "cosy-object/cosy-object-05.jpg", textColour: "white",         textPosition: "middle" },
    ],
  },
  "nature-closeup": {
    fallbackColor: "#c8e6c9",
    variants: [
      { file: "nature-closeup/nature-closeup-01.jpg", textColour: "white",         textPosition: "top",    backgroundPosition: "center 75%" },
      { file: "nature-closeup/nature-closeup-02.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#c99b5a", backgroundPosition: "center 25%" },
      { file: "nature-closeup/nature-closeup-03.jpg", textColour: "white",         textPosition: "middle" },
      { file: "nature-closeup/nature-closeup-04.jpg", textColour: "white",         textPosition: "right",  backgroundPosition: "center 75%" },
      { file: "nature-closeup/nature-closeup-05.jpg", textColour: "white",         textPosition: "top",    backgroundPosition: "center 50%" },
      { file: "nature-closeup/nature-closeup-06.jpg", textColour: "white",         textPosition: "right" },
    ],
  },
  "open-water": {
    fallbackColor: "#b3d9e8",
    variants: [
      { file: "open-water/open-water-01.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#c2893c" },
      { file: "open-water/open-water-02.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#a3675f" },
      { file: "open-water/open-water-03.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#ac9952" },
      { file: "open-water/open-water-04.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#a49a5a" },
      { file: "open-water/open-water-05.jpg", textColour: "white+outline", textPosition: "middle", accentColour: "#388e95" },
    ],
  },
};

const FALLBACK_ENTRY: TagEntry = {
  fallbackColor: "#fff8d3",
  variants: [{ file: "soft-textile/soft-textile-01.jpg", textColour: "white", textPosition: "middle" }],
};

export function getImageEntry(tag: string): ImageEntry {
  const entry = LIBRARY[tag] ?? FALLBACK_ENTRY;
  const variant = entry.variants[Math.floor(Math.random() * entry.variants.length)];
  return {
    file: variant.file,
    fallbackColor: entry.fallbackColor,
    textColour: variant.textColour,
    textPosition: variant.textPosition,
    backgroundPosition: variant.backgroundPosition ?? "center",
    accentColour: variant.accentColour,
  };
}

export function getImageEntryByFile(tag: string, file: string): ImageEntry {
  const entry = LIBRARY[tag] ?? FALLBACK_ENTRY;
  const variant = entry.variants.find((v) => v.file === file) ?? entry.variants[0];
  return {
    file: variant.file,
    fallbackColor: entry.fallbackColor,
    textColour: variant.textColour,
    textPosition: variant.textPosition,
    backgroundPosition: variant.backgroundPosition ?? "center",
    accentColour: variant.accentColour,
  };
}

export function getAllVariants(): PreviewVariant[] {
  return Object.entries(LIBRARY).flatMap(([tag, entry]) =>
    entry.variants.map((v) => ({
      tag,
      file: v.file,
      fallbackColor: entry.fallbackColor,
      textColour: v.textColour,
      textPosition: v.textPosition,
      backgroundPosition: v.backgroundPosition ?? "center",
      accentColour: v.accentColour,
    }))
  );
}
