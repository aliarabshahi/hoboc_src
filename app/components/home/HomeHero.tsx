import React from "react";

const HomeHero: React.FC = () => {
  return (
    <div className="hero bg-base-200 pt-24 pb-44">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">جامعه توسعه‌دهندگان ایران</h1>
          <p className="py-6 text-base md:text-lg text-gray-700">
            فضایی برای یادگیری، رشد حرفه‌ای و همگرایی توسعه‌دهندگان
          </p>
          <button className="btn bg-hoboc-dark text-lg text-white hover:bg-hoboc-dark/90 min-w-32">
            عضویت
          </button>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm mt-4" dir="rtl">
            <span className="text-center text-gray-500">به دنبال جذب توسعه دهنده هستید؟</span>
            <a href="#" className="text-hoboc hover:text-hoboc/80 transition-colors text-center">
              بیشتر بخوانید
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;