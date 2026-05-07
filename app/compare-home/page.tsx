"use client";

import { useState } from "react";

const OPTIONS = [
  {
    label: "A — Current (100%)",
    brand: "text-[50px]",
    h1: "text-[80px]",
    subtext: "text-[30px]",
    inputH: "h-[104px]",
    inputText: "text-[50px]",
    btnText: "text-[32px]",
    maxWidth: "max-w-[973px]",
  },
  {
    label: "B — 80% scale",
    brand: "text-[40px]",
    h1: "text-[64px]",
    subtext: "text-[24px]",
    inputH: "h-[83px]",
    inputText: "text-[40px]",
    btnText: "text-[26px]",
    maxWidth: "max-w-[973px]",
  },
];

function HomeLayout({ opt }: { opt: typeof OPTIONS[0] }) {
  return (
    <main className="flex h-full items-center justify-center bg-yellow-30 px-h-padding py-v-padding">
      <div className={`flex w-full flex-col items-center gap-m ${opt.maxWidth}`}>

        <div className="flex w-full flex-col items-center gap-l">
          <div className="flex flex-col items-center text-center text-brown-100">
            <p className={`font-melodrame ${opt.brand} leading-none`}>Daily Dose of Happiness</p>
            <p className={`font-bagel ${opt.h1} leading-tight`}>How are you feeling today?</p>
          </div>
          <div className="flex w-full flex-col items-center gap-[25px]">
            <p className={`font-xstitch ${opt.subtext} text-center text-black`}>
              Type 1-3 words below that summarises how you feel:
            </p>
            <div className={`flex ${opt.inputH} w-full items-center rounded-pill border-2 border-yellow-100 bg-yellow-10 px-[38px]`} />
          </div>
        </div>

        <div className="flex items-center gap-[34px]">
          <div className="rounded-card border-2 border-brown-100 bg-yellow-20 px-h-padding py-v-padding">
            <p className={`font-bagel ${opt.btnText} text-brown-200`}>Surprise Me!</p>
          </div>
          <div className="rounded-card border-4 border-yellow-70 bg-brown-100 px-h-padding py-v-padding">
            <p className={`font-bagel ${opt.btnText} text-yellow-10`}>Lock it in!</p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default function CompareHomePage() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 border-b-2 border-yellow-100 bg-yellow-20">
        {OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-l py-s font-bagel text-[24px] transition-colors ${
              active === i
                ? "bg-brown-100 text-yellow-10"
                : "text-brown-100 hover:bg-yellow-30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <HomeLayout opt={OPTIONS[active]} />
      </div>
    </div>
  );
}
