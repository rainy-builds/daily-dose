"use client";

import { useEffect, useState } from "react";
import type { SuggestionsResponse, SuggestionItem } from "@/app/api/suggestions/route";

function parseSuggestion(s: SuggestionItem): { body: string; eg: string } {
  const [main, eg = ""] = s.suggestion.split(" eg. ");
  const colonIdx = main.indexOf(":");
  const raw = colonIdx !== -1 ? main.slice(colonIdx + 1) : main;
  const body = raw.trim();
  return {
    body: body.charAt(0).toUpperCase() + body.slice(1),
    eg: eg.trim(),
  };
}

function SuggestionCard({ item }: { item: SuggestionItem }) {
  const { body, eg } = parseSuggestion(item);
  return (
    <div className="
      w-full rounded-card bg-[#fdfdfd]
      border border-yellow-100
      px-[21px] py-[18px]
      flex flex-col gap-[6px] justify-center xl:justify-start
      min-h-[104px]
      hover:bg-yellow-10 hover:border-2 hover:border-black transition-colors
    ">
      <p className="font-arial-narrow text-[13px] xl:text-[16px] text-brown-100 leading-normal">
        {body}
      </p>
      {eg && (
        <p className="font-arial-narrow text-[13px] xl:text-[16px] leading-normal italic" style={{ color: '#8a7f41' }}>
          eg. {eg}
        </p>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="
      w-full rounded-card bg-[#fdfdfd]
      border border-yellow-100
      px-[21px] py-[18px]
      flex flex-col gap-[8px] animate-pulse
      min-h-[104px]
    ">
      <div className="h-4 bg-yellow-60 rounded w-3/4 opacity-40" />
      <div className="h-3 bg-yellow-60 rounded w-1/2 opacity-30" />
    </div>
  );
}

export default function SuggestionsPanel({ words, affirmation, staticData, className }: { words?: string; affirmation?: string; staticData?: SuggestionsResponse; className?: string }) {
  const [data, setData] = useState<SuggestionsResponse | null>(staticData ?? null);

  useEffect(() => {
    if (staticData) return;
    fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words: words ?? undefined, affirmation: affirmation ?? undefined }),
    })
      .then((r) => r.json())
      .then((d: SuggestionsResponse) => setData(d))
      .catch(() => {});
  }, [words, staticData]);

  return (
    <div className={`
      bg-yellow-20 border-2 border-yellow-60 rounded-card
      pt-[24px] pl-[20px] pr-[16px] pb-[24px] xl:pt-[45px] xl:pl-[30px] xl:pr-[23px] xl:pb-[28px]
      flex flex-col gap-[14px] xl:gap-[20px] items-center
      w-full shrink-0
      ${className ?? ""}
    `}>
      <p className="font-melodrame text-[24px] xl:text-[32px] text-brown-100 leading-none text-center shrink-0">
        Try This Today ♫⋆｡♪
      </p>
      <div className="flex flex-col gap-[12px] w-full">
        {data
          ? data.suggestions.map((s) => <SuggestionCard key={s.domain} item={s} />)
          : [0, 1, 2].map((i) => <SkeletonCard key={i} />)
        }
      </div>
    </div>
  );
}
