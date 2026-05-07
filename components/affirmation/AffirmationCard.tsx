import type { AffirmationCardProps } from "@/lib/types";
import type { CSSProperties } from "react";

const positionClasses: Record<string, string> = {
  right: "flex items-center justify-center pb-[26cqw] pl-[38cqw] pt-[6cqw]",
  middle: "flex items-center justify-center",
  top: "flex items-start justify-center pt-[3.3cqw] pb-[26cqw] px-[13cqw]",
};

export default function AffirmationCard({
  affirmation,
  imageFile,
  fallbackColor,
  textPosition,
  textColour,
  backgroundPosition = "center",
  outlineColour,
}: AffirmationCardProps) {
  const textStyle: CSSProperties =
    textColour === "white+outline"
      ? {
          color: "#fdfdfd",
          WebkitTextStroke: `4px ${outlineColour}`,
          paintOrder: "stroke fill",
        }
      : textColour === "white"
        ? {
            color: "#fdfdfd",
            WebkitTextStroke: "4px rgba(0,0,0,0.4)",
            paintOrder: "stroke fill",
          }
        : { color: "#000" };

  return (
    <div
      className="relative rounded-card overflow-hidden @container"
      style={{
        aspectRatio: "1197 / 751",
        width: "min(100%, 1197px, calc((100vh - 266px) * 1197 / 751))",
        maxHeight: "100%",
        backgroundImage: `url(/images/affirmations/${imageFile})`,
        backgroundSize: "cover",
        backgroundPosition,
        backgroundColor: fallbackColor,
      }}
    >
      <div className={`absolute inset-0 ${positionClasses[textPosition]}`}>
        <p
          className="font-arial-narrow text-[clamp(20px,6.68cqw,80px)] leading-tight text-center w-[62cqw]"
          style={textStyle}
        >
          {affirmation}
        </p>
      </div>
      <span
        className="absolute bottom-3 left-3 font-arial-narrow text-[11px] tracking-wide text-white/70"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
      >
        image via Pinterest
      </span>
    </div>
  );
}
