import { redirect } from "next/navigation";
import { getImageEntry, getImageEntryByFile } from "@/lib/imageLibrary";
import ResultsHeader from "@/components/layout/ResultsHeader";
import AffirmationCard from "@/components/affirmation/AffirmationCard";

export default async function AffirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ affirmation?: string; imageTag?: string; imageFile?: string }>;
}) {
  const params = await searchParams;

  if (!params.affirmation) redirect("/");

  const affirmation = decodeURIComponent(params.affirmation);
  const imageTag = params.imageTag ?? "soft-textile";
  const imageFile = params.imageFile ? decodeURIComponent(params.imageFile) : null;

  const image = imageFile
    ? getImageEntryByFile(imageTag, imageFile)
    : getImageEntry(imageTag);
  const outlineColour =
    image.textColour === "white+outline" ? image.accentColour : undefined;

  return (
    <main className="flex h-full flex-col items-center bg-yellow-30 px-[79px] pt-[61px] pb-[61px] gap-[60px]">
      <ResultsHeader />
      <div className="flex flex-1 min-h-0 w-full items-center justify-center">
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
    </main>
  );
}
