"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResultsHeader() {
  const router = useRouter();
  return (
    <header className="flex items-center shrink-0 w-full">
      <button
        onClick={() => router.push("/")}
        aria-label="Go home"
        className="flex items-center gap-[26px] hover:opacity-70 transition-opacity"
      >
        <Image
          src="/icons/coffee/Icon = Coffee, Size = Small.png"
          alt=""
          width={84}
          height={67}
          className="shrink-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
        />
        <p className="font-melodrame text-[40px] text-brown-100 leading-none whitespace-nowrap">
          Daily Dose of Happiness
        </p>
      </button>
    </header>
  );
}
