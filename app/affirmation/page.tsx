import { redirect } from "next/navigation";
import { getImageEntry, getImageEntryByFile } from "@/lib/imageLibrary";
import ResultsHeader from "@/components/layout/ResultsHeader";
import AffirmationCard from "@/components/affirmation/AffirmationCard";
import SuggestionsPanel from "@/components/affirmation/SuggestionsPanel";

export default async function AffirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ affirmation?: string; imageTag?: string; imageFile?: string; words?: string }>;
}) {
  const params = await searchParams;

  if (!params.affirmation) redirect("/");

  const affirmation = decodeURIComponent(params.affirmation);
  const words = params.words ? decodeURIComponent(params.words) : undefined;
  const imageTag = params.imageTag ?? "soft-textile";
  const imageFile = params.imageFile ? decodeURIComponent(params.imageFile) : null;

  const image = imageFile
    ? getImageEntryByFile(imageTag, imageFile)
    : getImageEntry(imageTag);
  const outlineColour =
    image.textColour === "white+outline" ? image.accentColour : undefined;

  return (
    <main className="flex flex-col items-center bg-yellow-30 px-[20px] sm:px-[79px] pt-[40px] pb-[60px] gap-[40px] overflow-y-auto min-h-full">
      <ResultsHeader />
      <div className="flex flex-col xl:flex-row w-full max-w-[1282px] mx-auto items-center xl:items-start gap-[40px] xl:gap-[100px]">
        <div className="w-full xl:flex-1 xl:min-w-0 flex justify-center xl:justify-end items-start">
          <AffirmationCard
            affirmation={affirmation}
            imageFile={image.file}
            fallbackColor={image.fallbackColor}
            textPosition={image.textPosition}
            textColour={image.textColour}
            backgroundPosition={image.backgroundPosition}
            outlineColour={outlineColour}
          />
        </div>
        <div className="w-full xl:w-[410px] xl:shrink-0">
          <SuggestionsPanel words={words} affirmation={affirmation} />
        </div>
      </div>
    </main>
  );
}
