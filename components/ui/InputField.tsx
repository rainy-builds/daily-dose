"use client";

import { useState } from "react";
import { InputState } from "@/lib/types";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnter?: () => void;
  state: InputState;
  errorMessage?: string;
}

const borderClass: Record<InputState, string> = {
  default: "border-2 border-yellow-100",
  typing:  "border-2 border-yellow-100",
  hover:   "border-4 border-yellow-100",
  error:   "border-2 border-red-500",
  success: "border-2 border-yellow-100",
};

export default function InputField({
  value,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  state,
  errorMessage,
}: InputFieldProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const activeBorderClass =
    state === "error" ? "border-2 border-red-500"
    : isHovered ? "border-4 border-yellow-100"
    : borderClass[state];

  return (
    <div className="w-full">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex h-[56px] sm:h-[83px] w-full items-center justify-between
          rounded-pill bg-yellow-10
          pl-[20px] sm:pl-[30px] pr-[16px] sm:pr-[24px] py-[8px]
          transition-colors overflow-visible
          ${activeBorderClass}
        `}
      >
        {isFocused && !value && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="w-[3px] h-[28px] sm:h-[44px] bg-brown-100 rounded-full"
              style={{ animation: 'caretBlink 1s step-end infinite' }}
            />
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setIsFocused(true); onFocus?.(); }}
          onBlur={() => { setIsFocused(false); onBlur?.(); }}
          onKeyDown={(e) => { if (e.key === "Enter") onEnter?.(); }}
          aria-invalid={state === "error"}
          className="
            w-full bg-transparent
            font-melodrame text-[22px] sm:text-[40px] leading-none
            text-brown-100 outline-none text-center
            placeholder:text-yellow-60
          "
          style={{
            textIndent: '8px',
            caretColor: isFocused && !value ? 'transparent' : undefined,
          }}
          placeholder=""
        />
      </div>
      <p
        className="font-xstitch text-[13px] sm:text-[20px] text-red-500 mt-2"
        style={{ visibility: state === "error" && errorMessage ? "visible" : "hidden" }}
      >
        {errorMessage ?? "placeholder"}
      </p>
    </div>
  );
}
