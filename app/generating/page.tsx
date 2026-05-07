"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CoffeeLoader from "@/components/affirmation/CoffeeLoader";
import type { GenerateRequest, GenerateResponse, InvalidInputReason } from "@/lib/types";
import { getImageEntry } from "@/lib/imageLibrary";
import { Suspense } from "react";

function GeneratingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [errorType, setErrorType] = useState<"api" | InvalidInputReason | null>(null);

  useEffect(() => {
    const hasIntent = sessionStorage.getItem("generating-intent");
    if (!hasIntent) {
      router.replace("/");
      return;
    }

    const controller = new AbortController();
    const words = params.get("words") ?? undefined;
    const mode = (params.get("mode") ?? "word") as GenerateRequest["mode"];

    const body: GenerateRequest = { words, mode };

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 422) {
          const body = await res.json() as { error: string };
          sessionStorage.removeItem("generating-intent");
          setErrorType(body.error === "inappropriate" ? "inappropriate" : "gibberish");
          return null;
        }
        if (!res.ok) throw new Error("API error");
        return res.json() as Promise<GenerateResponse>;
      })
      .then((data) => {
        if (!data) return;
        sessionStorage.removeItem("generating-intent");
        const lastFile = sessionStorage.getItem("last-image-file");
        let image = getImageEntry(data.imageTag);
        if (image.file === lastFile) {
          const retry = getImageEntry(data.imageTag);
          if (retry.file !== lastFile) image = retry;
        }
        sessionStorage.setItem("last-image-file", image.file);
        router.replace(
          `/affirmation?affirmation=${encodeURIComponent(data.affirmation)}&imageTag=${data.imageTag}&imageFile=${encodeURIComponent(image.file)}`
        );
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        sessionStorage.removeItem("generating-intent");
        setErrorType("api");
        setTimeout(() => router.replace("/"), 5000);
      });

    return () => controller.abort();
  }, [router, params]);

  if (errorType) {
    const isInputError = errorType === "gibberish" || errorType === "inappropriate";
    return (
      <main className="flex h-full flex-col items-center justify-center bg-yellow-30 px-h-padding py-v-padding">
        <div className="flex flex-col items-center text-center gap-m">
          <div className="flex flex-col items-center gap-[14px]">
            <p className="font-bagel text-[50px] text-brown-100 leading-none">OOPS!</p>
            <p className="font-arial-narrow text-[26px] text-black leading-normal max-w-[931px]">
              {isInputError
                ? "We couldn't make sense of that - try different words that describe how you feel."
                : "Something went wrong — heading back home."}
            </p>
          </div>
          {isInputError && (
            <button
              onClick={() => router.replace("/")}
              className="font-bagel text-[32px] text-yellow-10 bg-[#884c46] px-h-padding py-v-padding rounded-pill hover:opacity-80 transition-opacity"
            >
              Try again
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-m bg-yellow-30 px-h-padding py-v-padding">
      {/* Title */}
      <div className="flex flex-col items-center text-center text-brown-100">
        <p className="font-melodrame text-[40px] leading-none">
          Daily Dose of Happiness
        </p>
        <p className="font-bagel text-[64px] leading-tight">
          Affirmations Generating...
        </p>
      </div>

      {/* Animated coffee cup */}
      <CoffeeLoader />
    </main>
  );
}

export default function GeneratingPage() {
  return (
    <Suspense>
      <GeneratingContent />
    </Suspense>
  );
}
