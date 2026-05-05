"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CoffeeLoader from "@/components/affirmation/CoffeeLoader";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";
import { getImageEntry } from "@/lib/imageLibrary";
import { Suspense } from "react";

function GeneratingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json() as Promise<GenerateResponse>;
      })
      .then((data) => {
        const image = getImageEntry(data.imageTag);
        router.replace(
          `/affirmation?affirmation=${encodeURIComponent(data.affirmation)}&imageTag=${data.imageTag}&imageFile=${encodeURIComponent(image.file)}`
        );
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setHasError(true);
        setTimeout(() => router.replace("/"), 5000);
      });

    return () => controller.abort();
  }, [router, params]);

  if (hasError) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-s bg-yellow-30 px-h-padding py-v-padding">
        <div className="flex flex-col items-center text-center text-brown-100">
          <p className="font-melodrame text-[50px] leading-none">
            oops.
          </p>
          <p className="font-bagel text-[80px] leading-tight">
            something went wrong.
          </p>
        </div>
        <p className="font-arial-narrow text-[24px] text-brown-100 opacity-60">
          heading back home...
        </p>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-m bg-yellow-30 px-h-padding py-v-padding">
      {/* Title */}
      <div className="flex flex-col items-center text-center text-brown-100">
        <p className="font-melodrame text-[50px] leading-none">
          Daily Dose of Happiness
        </p>
        <p className="font-bagel text-[80px] leading-tight">
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
