import React from "react";

const HomeHero: React.FC = () => {
  return (
    <div className="hero bg-base-200 bg-custom-blue-for-hero-bg pt-24 pb-24">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800" dir="rtl">از بیت تا بینش</h1>
          
          <p className="py-6 text-base md:text-lg text-gray-700" dir="rtl">
            جایی که داده‌ی خام به بینش تبدیل می‌شود.
          </p>

          <p className="text-sm text-gray-400" dir="ltr">
            Head Of Bits, Origin of Clarity
          </p>

          <button className="btn bg-hoboc-dark text-lg text-white hover:bg-hoboc-dark/90 min-w-32 mt-6">
            عضویت
          </button>

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
};

export default HomeHero;
