import AffirmationCard from "@/components/affirmation/AffirmationCard";
import ResultsHeader from "@/components/layout/ResultsHeader";

const SAMPLE_TEXT = "you have time. you have time. you have time.";

// Scale a 1440px-wide page down to fit the comparison column
const CANVAS_W = 1440;
const CANVAS_H = 900;
const SCALE = 0.52;
const W = Math.round(CANVAS_W * SCALE);
const H = Math.round(CANVAS_H * SCALE);

function PageMockup({
  label,
  hPadding,
  vPadding,
  cardMaxWidth,
}: {
  label: string;
  hPadding: number;
  vPadding: number;
  cardMaxWidth: number | "full";
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="font-arial-narrow text-[18px] font-bold text-brown-100">{label}</p>

      {/* Scaled page frame */}
      <div style={{ width: W, height: H, overflow: "hidden", borderRadius: 12, border: "2px solid #441e1a" }}>
        <div
          style={{
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            width: CANVAS_W,
            height: CANVAS_H,
          }}
        >
          {/* Simulated page */}
          <div
            style={{
              width: CANVAS_W,
              minHeight: CANVAS_H,
              backgroundColor: "#fff2b2",
              paddingLeft: hPadding,
              paddingRight: hPadding,
              paddingTop: vPadding,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 60,
            }}
          >
            <ResultsHeader />
            <div
              style={{
                width: cardMaxWidth === "full" ? "100%" : cardMaxWidth,
                maxWidth: cardMaxWidth === "full" ? "100%" : cardMaxWidth,
              }}
            >
              <AffirmationCard
                affirmation={SAMPLE_TEXT}
                imageFile="soft-textile/soft-textile-01.jpg"
                fallbackColor="#fff8d3"
                textPosition="middle"
                textColour="white"
                backgroundPosition="center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="flex gap-[12px] flex-wrap">
        <span className="font-arial-narrow text-[13px] bg-brown-100 text-yellow-10 px-[8px] py-[3px] rounded-[4px]">
          h-padding: {hPadding}px
        </span>
        <span className="font-arial-narrow text-[13px] bg-brown-100 text-yellow-10 px-[8px] py-[3px] rounded-[4px]">
          v-padding: {vPadding}px
        </span>
        <span className="font-arial-narrow text-[13px] bg-brown-100 text-yellow-10 px-[8px] py-[3px] rounded-[4px]">
          card-width: {cardMaxWidth === "full" ? `${CANVAS_W - hPadding * 2}px (w-full)` : `${cardMaxWidth}px (max-w)`}
        </span>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="min-h-full bg-yellow-30 px-h-padding py-v-padding">
      <div className="mb-m">
        <p className="font-melodrame text-[50px] text-brown-100 leading-none">Before / After</p>
        <p className="font-arial-narrow text-[20px] text-brown-100 mt-xs">
          Page padding & card width — current vs Figma spec
        </p>
      </div>

      <div className="flex gap-m flex-wrap">
        <PageMockup
          label="BEFORE — current code (h-padding 50px, w-full card)"
          hPadding={50}
          vPadding={20}
          cardMaxWidth="full"
        />
        <PageMockup
          label="AFTER — Figma spec (h-padding 79px, max-w 1197px card)"
          hPadding={79}
          vPadding={61}
          cardMaxWidth={1197}
        />
      </div>
    </main>
  );
}
