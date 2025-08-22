"use client";

import FinalWordCard from "./FinalWordCard";
import FinalWordBackground from "./FinalWordBackground";

export default function FinalWord() {
  return (
    <div className="relative bg-white z-0 overflow-hidden" dir="rtl">
      <div className="relative isolate px-6 pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-14 md:pb-12 lg:pt-24 lg:pb-14">
        <FinalWordCard />
      </div>
      <FinalWordBackground />
    </div>
  );
}
