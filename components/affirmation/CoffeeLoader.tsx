"use client";

import { useState, useEffect } from "react";

const ICONS = [
  "/icons/coffee/Icon = Coffee, Size = Large.png",
  "/icons/coffee/Icon = Matcha, Size = Large.png",
  "/icons/coffee/Icon = Juice, Size = Large.png",
];

export default function CoffeeLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ICONS.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <img
      src={ICONS[index]}
      alt="Loading…"
      width={220}
      height={220}
      className="w-[120px] sm:w-[220px] h-auto"
      style={{ objectFit: "contain" }}
    />
  );
}
