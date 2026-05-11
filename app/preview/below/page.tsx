import AffirmationCard from "@/components/affirmation/AffirmationCard";
import ResultsHeader from "@/components/layout/ResultsHeader";
import SuggestionsPanel from "@/components/affirmation/SuggestionsPanel";
import { SAMPLE_AFFIRMATION, SAMPLE_SUGGESTIONS } from "../layout-data";

export default function PreviewBelow() {
  return (
    <main className="flex flex-col items-center bg-yellow-30 px-[79px] pt-[40px] pb-[60px] gap-[40px] overflow-y-auto min-h-full">
      <ResultsHeader />
      <p className="font-arial-narrow text-[13px] bg-brown-100 text-yellow-10 px-[10px] py-[4px] rounded-[4px]">
        Layout A — suggestions below
      </p>
      <div className="flex w-full items-center justify-center">
        <AffirmationCard
          affirmation={SAMPLE_AFFIRMATION}
          imageFile="food-macro/food-macro-01.jpg"
          fallbackColor="#fff2b2"
          textPosition="middle"
          textColour="black"
          backgroundPosition="center"
        />
      </div>
      <SuggestionsPanel staticData={{ suggestions: SAMPLE_SUGGESTIONS }} />
    </main>
  );
}
