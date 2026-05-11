import AffirmationCard from "@/components/affirmation/AffirmationCard";
import ResultsHeader from "@/components/layout/ResultsHeader";
import SuggestionsPanel from "@/components/affirmation/SuggestionsPanel";
import { SAMPLE_AFFIRMATION, SAMPLE_SUGGESTIONS } from "../layout-data";

export default function PreviewRight() {
  return (
    <main className="flex flex-col items-center bg-yellow-30 px-[40px] xl:px-[79px] pt-[40px] pb-[60px] gap-[40px] overflow-y-auto min-h-full">
      <ResultsHeader />
      <p className="font-arial-narrow text-[13px] bg-brown-100 text-yellow-10 px-[10px] py-[4px] rounded-[4px]">
        Layout B — suggestions to the right
      </p>
      <div className="flex flex-col xl:flex-row w-full max-w-[1282px] mx-auto items-center xl:items-start gap-[40px] xl:gap-[100px]">
        <div className="w-full xl:flex-1 xl:min-w-0 flex justify-center xl:justify-end items-start">
          <AffirmationCard
            affirmation={SAMPLE_AFFIRMATION}
            imageFile="food-macro/food-macro-01.jpg"
            fallbackColor="#fff2b2"
            textPosition="middle"
            textColour="black"
            backgroundPosition="center"
          />
        </div>
        <div className="w-full xl:w-[410px] xl:shrink-0">
          <SuggestionsPanel staticData={{ suggestions: SAMPLE_SUGGESTIONS }} />
        </div>
      </div>
    </main>
  );
}
