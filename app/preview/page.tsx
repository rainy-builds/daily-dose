import { getAllVariants } from "@/lib/imageLibrary";
import AffirmationCard from "@/components/affirmation/AffirmationCard";

const SAMPLE_TEXT = "you have time. you have time. you have time.";

// Scale 1197×751 card down to fit two per row
const SCALE = 0.46;
const W = Math.round(1197 * SCALE); // 550
const H = Math.round(751 * SCALE);  // 345

export default function PreviewPage() {
  const variants = getAllVariants();

  return (
    <main className="min-h-full bg-yellow-30 px-h-padding py-v-padding">
      <div className="mb-m">
        <p className="font-melodrame text-[50px] text-brown-100 leading-none">
          Image Preview
        </p>
        <p className="font-arial-narrow text-[20px] text-brown-100 mt-xs">
          {variants.length} images — review legibility, position, and accent colour
        </p>
      </div>

      <div
        className="grid gap-m"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${W}px, 1fr))` }}
      >
        {variants.map((v) => (
          <div key={v.file}>
            {/* Scaled card */}
            <div
              style={{ width: W, height: H, overflow: "hidden", borderRadius: 14 }}
            >
              <div
                style={{
                  transform: `scale(${SCALE})`,
                  transformOrigin: "top left",
                  width: 1197,
                  height: 751,
                }}
              >
                <AffirmationCard
                  affirmation={SAMPLE_TEXT}
                  imageFile={v.file}
                  fallbackColor={v.fallbackColor}
                  textPosition={v.textPosition}
                  textColour={v.textColour}
                  backgroundPosition={v.backgroundPosition}
                  outlineColour={v.accentColour}
                />
              </div>
            </div>

            {/* Metadata row */}
            <div className="mt-xs flex items-center gap-xs flex-wrap">
              <span className="font-arial-narrow text-[13px] text-brown-100 font-bold">
                {v.tag}
              </span>
              <span className="font-arial-narrow text-[13px] text-brown-100 opacity-60">
                {v.file.split("/").pop()}
              </span>
              <span className="font-arial-narrow text-[11px] bg-brown-100 text-yellow-10 px-[6px] py-[2px] rounded-[4px]">
                {v.textColour}
              </span>
              <span className="font-arial-narrow text-[11px] bg-yellow-20 text-brown-100 border border-brown-100 px-[6px] py-[2px] rounded-[4px]">
                {v.textPosition}
              </span>
              {v.accentColour && (
                <span className="flex items-center gap-[4px]">
                  <span
                    className="inline-block w-[14px] h-[14px] rounded-[3px] border border-brown-100"
                    style={{ backgroundColor: v.accentColour }}
                  />
                  <span className="font-arial-narrow text-[11px] text-brown-100">
                    {v.accentColour}
                  </span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
