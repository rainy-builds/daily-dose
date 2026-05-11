"use client";

import { useState } from "react";
import type { SuggestionsResponse } from "@/app/api/suggestions/route";

export default function SuggestionsTestPanel() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchSuggestions() {
    setLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: input.trim() || undefined }),
      });
      if (!res.ok) throw new Error("API error");
      const data: SuggestionsResponse = await res.json();
      setSuggestions(data);
    } catch {
      setError("Something went wrong — try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[800px] bg-yellow-10 border-2 border-yellow-100 rounded-card p-6 flex flex-col gap-4">
      <p className="font-bagel text-[14px] text-yellow-70 uppercase tracking-widest">
        ⚗️ Suggestions Test Panel
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") fetchSuggestions(); }}
          placeholder="type a feeling or leave blank for surprise..."
          className="flex-1 bg-yellow-20 border border-yellow-100 rounded-card px-4 py-2 font-arial-narrow text-[16px] text-brown-100 outline-none"
        />
        <button
          onClick={fetchSuggestions}
          disabled={loading}
          className="font-bagel text-[14px] bg-brown-100 text-yellow-10 px-4 py-2 rounded-card disabled:opacity-50"
        >
          {loading ? "loading..." : "get suggestions"}
        </button>
      </div>

      {error && (
        <p className="font-arial-narrow text-[14px] text-red-500">{error}</p>
      )}

      {suggestions && (
        <div className="flex flex-col gap-3">
          {suggestions.suggestions.map((s) => (
            <div key={s.domain} className="bg-yellow-20 rounded-card px-4 py-3">
              <p className="font-arial-narrow text-[15px] text-brown-100 leading-relaxed">
                {s.suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
