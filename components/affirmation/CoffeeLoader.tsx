"use client";

import { useState, useEffect } from "react";

// Shared face parts are identical across all 3 variants
const SHARED = {
  eye:   "/icons/coffee/eye.svg",
  pupil: "/icons/coffee/pupil.svg",
  nose:  "/icons/coffee/nose.svg",
  smile: "/icons/coffee/smile.svg",
};

// The 3 drink variants — only the blob, body, rim, rim-highlight, and handle differ
const VARIANTS = [
  {
    blob:         "/icons/coffee/blob.svg",
    body:         "/icons/coffee/body.png",
    rim:          "/icons/coffee/rim.png",
    rimHighlight: "/icons/coffee/rim-highlight.png",
    handle:       "/icons/coffee/handle.png",
  },
  {
    blob:         "/icons/coffee/blob-matcha.svg",
    body:         "/icons/coffee/body-matcha.png",
    rim:          "/icons/coffee/rim-matcha.png",
    rimHighlight: "/icons/coffee/rim-highlight-matcha.png",
    handle:       "/icons/coffee/handle-matcha.png",
  },
  {
    blob:         "/icons/coffee/blob-juice.svg",
    body:         "/icons/coffee/body-juice.png",
    rim:          "/icons/coffee/rim-juice.png",
    rimHighlight: "/icons/coffee/rim-highlight-juice.png",
    handle:       "/icons/coffee/handle-juice.png",
  },
] as const;

export default function CoffeeLoader({ animated = true }: { animated?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % VARIANTS.length);
    }, 900);
    return () => clearInterval(id);
  }, [animated]);

  const v = VARIANTS[index];

  return (
    <div
      className={animated ? "animate-bounce" : ""}
      style={{ width: 276, height: 224, position: "relative" }}
      aria-label="Loading…"
      role="status"
    >
      {/* Blob background (drink-specific) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.blob} alt="" style={{ position: "absolute", left: -4, top: 0, width: 284, height: 232 }} />
      {/* Rim / drink surface */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.rim} alt="" style={{ position: "absolute", left: 22, top: 18, width: 206, height: 60 }} />
      {/* Cup body */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.body} alt="" style={{ position: "absolute", left: 21, top: 45, width: 206, height: 153 }} />
      {/* Rim highlight */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.rimHighlight} alt="" style={{ position: "absolute", left: 33, top: 45, width: 184, height: 33 }} />
      {/* Handle */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.handle} alt="" style={{ position: "absolute", left: 211, top: 68, width: 45, height: 51 }} />

      {/* Face — shared across all variants */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.eye} alt="" style={{ position: "absolute", left: 62, top: 91, width: 26, height: 42 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.eye} alt="" style={{ position: "absolute", left: 131, top: 91, width: 26, height: 42 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.pupil} alt="" style={{ position: "absolute", left: 62, top: 101, width: 13, height: 21 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.pupil} alt="" style={{ position: "absolute", left: 131, top: 101, width: 13, height: 21 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.nose} alt="" style={{ position: "absolute", left: 98, top: 122, width: 23, height: 33 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SHARED.smile} alt="" style={{ position: "absolute", left: 96, top: 159, width: 27, height: 11 }} />
    </div>
  );
}
