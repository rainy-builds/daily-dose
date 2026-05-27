import CoffeeLoader from "@/components/affirmation/CoffeeLoader";

export default function AffirmationLoading() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-m bg-yellow-30 px-h-padding py-v-padding">
      <div className="flex flex-col items-center text-center text-brown-100">
        <p className="font-melodrame text-[50px] leading-none">
          Daily Dose of Hope
        </p>
        <p className="font-bagel text-[80px] leading-tight">
          Affirmations Generating...
        </p>
      </div>
      <CoffeeLoader />
    </main>
  );
}
