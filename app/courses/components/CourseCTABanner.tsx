"use client";

export default function CourseCTABanner() {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
        <h2 className="font-bold text-2xl text-hoboc-dark mb-2" dir="rtl">
          از همین حالا آموزش دیتا را شروع کن!
        </h2>
        <p className="text-hoboc-dark text-base" dir="rtl">
          با شرکت در دوره‌های علم داده و مهندسی داده، مهارت‌های تخصصی کسب کن و قدم به دنیای داده‌ها بگذار.
        </p>
      </div>
      <button className="btn bg-hoboc hover:bg-hoboc-dark text-white px-8 py-3 rounded-xl font-bold text-lg transition">
        مشاهده همه دوره‌ها
      </button>
    </div>
  );
}
