'use client';

import NewHeroBackground from "./NewHeroBackground";

export default function NewHero() {
  return (
    <div className="bg-white">
      <div className="relative isolate pt-24 pb-24 px-6 lg:px-8">
        <NewHeroBackground />

        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800" dir="rtl">
            از بیت تا بینش
          </h1>

          <p className="py-6 text-base md:text-lg text-gray-700" dir="rtl">
            جایی که داده‌ی خام به بینش تبدیل می‌شود.
          </p>

          <p className="text-sm text-gray-400" dir="ltr">
            Head Of Bits, Origin of Clarity
          </p>

          <div className="mt-6">
            <button className="btn bg-hoboc-dark text-lg text-white hover:bg-hoboc-dark/90 min-w-32">
              عضویت
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm mt-4" dir="rtl">
            <span className="text-center text-gray-500">تو ام می‌خوای این کاره شی؟!</span>
            <a href="#" className="text-hoboc hover:text-hoboc/80 transition-colors text-center">
              شروع آموزش
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
