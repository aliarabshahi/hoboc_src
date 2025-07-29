"use client";

export default function BlogCTABanner() {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
              <h2 className="font-bold text-2xl text-hoboc-dark mb-2" dir="rtl">همین حالا مسیر یادگیری خود را شروع کنید!</h2>
              <p className="text-hoboc-dark text-base" dir="rtl">
                با ثبت‌نام و حضور در دوره‌های آموزشی، حرفه‌ای شوید و وارد بازار کار شوید.
              </p>      </div>
      <button className="btn bg-hoboc hover:bg-hoboc-dark text-white px-8 py-3 rounded-xl font-bold text-lg transition">
        مشاهده همه مقالات
      </button>
    </div>
  );
}
