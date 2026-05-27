"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import TypewriterText from "@/components/ui/TypewriterText";
import { InputState } from "@/lib/types";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

function hasLongWord(text: string): boolean {
  return text.trim().split(/\s+/).some((w) => w.length > 25);
}

type ErrorReason = "empty" | "tooMany" | "noSpaces" | null;

function deriveErrorReason(value: string, hasTriedSubmit: boolean): ErrorReason {
  if (!value.trim() && hasTriedSubmit) return "empty";
  if (value && hasLongWord(value)) return "noSpaces";
  if (value && countWords(value) > 3) return "tooMany";
  return null;
}

function deriveInputState(
  value: string,
  isFocused: boolean,
  hasTriedSubmit: boolean
): InputState {
  if (deriveErrorReason(value, hasTriedSubmit)) return "error";
  if (value && countWords(value) >= 1 && countWords(value) <= 3) return "success";
  if (isFocused || value) return "typing";
  return "default";
}

const ERROR_MESSAGES: Record<NonNullable<ErrorReason>, string> = {
  empty:    "Please enter 1–3 words",
  tooMany:  "Please enter 1–3 words (you entered too many)",
  noSpaces: "Looks like you forgot spaces — try separating your words",
};

export default function HomePage() {
  const router = useRouter();
  const [words, setWords] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const errorReason = deriveErrorReason(words, hasTriedSubmit);
  const inputState = deriveInputState(words, isFocused, hasTriedSubmit);
  const wordCount = countWords(words);
  const isValid = wordCount >= 1 && wordCount <= 3 && !hasLongWord(words);

  const errorMessage = errorReason ? ERROR_MESSAGES[errorReason] : undefined;

  function handleSubmit() {
    setHasTriedSubmit(true);
    if (!isValid || isNavigating) return;
    setIsNavigating(true);
    sessionStorage.setItem("generating-intent", "1");
    router.push(`/generating?words=${encodeURIComponent(words.trim())}&mode=word`);
  }

  function handleSurprise() {
    if (isNavigating) return;
    setIsNavigating(true);
    sessionStorage.setItem("generating-intent", "1");
    router.push("/generating?mode=surprise");
  }

  return (
    <main className="flex h-full items-center justify-center bg-yellow-30 px-[20px] sm:px-h-padding py-v-padding">
      <div className="flex w-full max-w-[973px] flex-col items-center gap-[20px] sm:gap-m">

        {/* Title section */}
        <div className="flex w-full flex-col items-center gap-[20px] sm:gap-l">

          {/* Brand + H1 */}
          <div className="flex flex-col items-center text-center text-brown-100">
            <p className="font-melodrame text-[22px] sm:text-[40px] leading-none">
              Daily Dose of Hope
            </p>
            <TypewriterText
              text="How are you feeling today?"
              className="font-bagel text-[36px] sm:text-[64px] leading-tight text-center min-h-[90px] sm:min-h-[80px]"
            />
          </div>

          {/* Subtext + Input */}
          <div className="flex w-full flex-col items-center gap-[14px] sm:gap-[25px]">
            <p className="font-xstitch text-[15px] sm:text-[24px] text-center text-black">
              Type 1-3 words below that summarises how you feel:
            </p>
            <InputField
              value={words}
              onChange={setWords}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onEnter={words.trim() ? handleSubmit : undefined}
              state={inputState}
              errorMessage={inputState === "error" ? errorMessage : undefined}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-[16px] sm:gap-[34px]">
          <SecondaryButton onClick={handleSurprise} disabled={isNavigating}>
            Surprise Me!
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!words.trim() || isNavigating}>
            Lock it in!
          </PrimaryButton>
        </div>

      </div>
    </main>
  );
}
