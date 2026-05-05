"use client";

import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      aria-label="Go home"
      className="bg-yellow-20 border-2 border-brown-100 rounded-pill px-s py-xs flex items-center justify-center"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M5 18L20 6L35 18"
          stroke="#441e1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect
          x="9"
          y="18"
          width="22"
          height="16"
          rx="1"
          fill="#fff8d3"
          stroke="#441e1a"
          strokeWidth="2"
        />
        <rect x="16" y="26" width="8" height="8" rx="1" fill="#441e1a" />
        <rect x="27" y="8" width="3" height="7" rx="0.5" fill="#504922" />
      </svg>
    </button>
  );
}
