"use client";

export default function CompareInputPage() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-l bg-yellow-30 px-h-padding py-v-padding">
      <p className="font-bagel text-[32px] text-brown-100">Input Error State — Before vs After</p>

      <div className="flex w-full max-w-[1200px] gap-l">
        {/* BEFORE */}
        <div className="flex flex-1 flex-col gap-s">
          <p className="font-xstitch text-[24px] text-center text-brown-100">Before</p>
          <div className="flex h-[104px] w-full items-center rounded-pill border-2 border-red-500 bg-yellow-10 pl-[38px] pr-[30px]">
            <span className="font-melodrame text-[50px] leading-none text-yellow-100">Text |</span>
          </div>
          <p className="font-xstitch text-[20px] text-red-500">Please enter 1–3 words (you entered too many)</p>
        </div>

        {/* AFTER */}
        <div className="flex flex-1 flex-col gap-s">
          <p className="font-xstitch text-[24px] text-center text-brown-100">After</p>
          <div className="flex h-[104px] w-full items-center rounded-pill border-2 border-[#ff1010] bg-yellow-10 pl-[38px] pr-[30px]">
            <span className="font-melodrame text-[50px] leading-none text-yellow-100">Text |</span>
          </div>
          <p className="font-melodrame text-[36px] text-center text-[#ff1010]">Please enter 1–3 words (you entered too many)</p>
        </div>
      </div>
    </main>
  );
}
