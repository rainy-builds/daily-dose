"use client";

import Image from "next/image";

const coffeeIcon = "/icons/coffee/Icon = Coffee, Size = Small.png";

export default function CompareHeaderPage() {
  return (
    <main className="flex min-h-full flex-col gap-l bg-yellow-30 px-[79px] py-[61px]">
      <div className="flex flex-col gap-s">
        <p className="font-xstitch text-[24px] text-brown-100">Current (brown text, no home button)</p>
        <header className="flex items-center w-full">
          <button className="flex items-center gap-[32px] hover:opacity-70 transition-opacity">
            <Image src={coffeeIcon} alt="" width={105} height={84} className="shrink-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]" />
            <p className="font-melodrame text-[50px] text-brown-100 leading-none whitespace-nowrap">Daily Dose of Happiness</p>
          </button>
        </header>
      </div>
      <div className="border-t-2 border-brown-100 opacity-20" />
      <div className="flex flex-col gap-s">
        <p className="font-xstitch text-[24px] text-brown-100">Figma (black text)</p>
        <header className="flex items-center w-full">
          <button className="flex items-center gap-[32px] hover:opacity-70 transition-opacity">
            <Image src={coffeeIcon} alt="" width={105} height={84} className="shrink-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]" />
            <p className="font-melodrame text-[50px] text-black leading-none whitespace-nowrap">Daily Dose of Happiness</p>
          </button>
        </header>
      </div>
    </main>
  );
}
