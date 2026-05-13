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

// #4: ring-inset avoids the 1px layout shift from border-1→border-2 on hover
function SuggestionCard({ item }: { item: SuggestionItem }) {
  const { body, eg } = parseSuggestion(item);
  return (
    <div
      className="
        w-full rounded-card bg-[#fdfdfd]
        border border-yellow-100
        px-[21px] py-[18px]
        flex flex-col gap-[6px] justify-center xl:justify-start
        min-h-[104px]
        hover:bg-yellow-10 hover:ring-2 hover:ring-inset hover:ring-black transition-colors
      "
    >
      <p className="font-arial-narrow text-[13px] xl:text-[16px] text-brown-100 leading-normal">
        {body}
      </p>
      {eg && (
        <p
          className="font-arial-narrow text-[12px] xl:text-[15px] leading-normal italic opacity-80"
          style={{ color: '#8a7f41' }}
        >
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

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-[12px] py-[16px] text-center">
      <p className="font-arial-narrow text-[14px] text-brown-100 opacity-60 leading-normal">
        couldn't load suggestions
      </p>
      <button
        onClick={onRetry}
        className="font-arial-narrow text-[13px] text-brown-100 underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        try again
      </button>
    </div>
  );
}

export default function SuggestionsPanel({ words, affirmation, staticData, className }: { words?: string; affirmation?: string; staticData?: SuggestionsResponse; className?: string }) {
  const [data, setData] = useState<SuggestionsResponse | null>(staticData ?? null);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (staticData) return;
    const cacheKey = `suggestions:${affirmation ?? ""}:${words ?? ""}`;
    if (retryKey === 0) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) { setData(JSON.parse(cached) as SuggestionsResponse); return; }
      } catch {}
    }
    setError(false);
    fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words: words ?? undefined, affirmation: affirmation ?? undefined }),
    })
      .then((r) => r.json())
      .then((d: SuggestionsResponse) => {
        try { sessionStorage.setItem(cacheKey, JSON.stringify(d)); } catch {}
        setData(d);
      })
      .catch(() => setError(true));
  }, [words, affirmation, staticData, retryKey]);

  return (
    <div className={`
      bg-yellow-20 border-2 border-yellow-60 rounded-card
      pt-[24px] pl-[20px] pr-[16px] pb-[24px] xl:pt-[45px] xl:pl-[30px] xl:pr-[23px] xl:pb-[28px]
      flex flex-col gap-[14px] xl:gap-[20px] items-center
      w-full
      ${className ?? ""}
    `}>
      <p className="font-melodrame text-[24px] xl:text-[32px] text-brown-100 leading-none text-center shrink-0">
        Try This Today ♫⋆｡♪
      </p>
      <div className="flex flex-col gap-[12px] w-full">
        {error ? (
          <ErrorState onRetry={() => { setData(null); setRetryKey((k) => k + 1); }} />
        ) : data ? (
          data.suggestions.map((s) => <SuggestionCard key={s.domain} item={s} />)
        ) : (
          [0, 1, 2].map((i) => <SkeletonCard key={i} />)
        )}
      </div>
    </div>
  );
}
