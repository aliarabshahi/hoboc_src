// app/page.tsx

/**
 * Main Landing Page - Inspired by learning.emofid.com
 * Styled with custom borders/colors and sample images.
 */

const sampleCourses = [
  {
    title: "آموزش مقدماتی بورس",
    desc: "آشنایی با مفاهیم پایه و ورود به بازار سرمایه به زبان ساده و کاربردی.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "تحلیل تکنیکال مقدماتی",
    desc: "شروع تحلیل فنی بازارها با مثال‌های عملی از بورس ایران.",
    image: "https://images.unsplash.com/photo-1515165562835-cbdf6c19710a?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "مدیریت سرمایه",
    desc: "یادگیری شیوه‌های مدیریت ریسک و سرمایه برای معامله‌گران تازه‌کار.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "آموزش تابلوخوانی",
    desc: "آشنایی با سایت TSETMC و مهارت خواندن تابلو معاملات بورس.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "تحلیل بنیادی سهام",
    desc: "بررسی اصولی صورت‌های مالی، EPS و شاخص‌های تحلیلی شرکت‌ها.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "روانشناسی بازار و معامله‌گری",
    desc: "آشنایی با رفتارشناسی معامله‌گران و مدیریت احساسات در بازار.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-white pt-16 pb-12 shadow rounded-b-xl">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800" dir="rtl">
              آموزش حرفه‌ای سرمایه‌گذاری و بازارهای مالی
            </h1>
            <p className="text-gray-600 md:text-lg mb-6" dir="rtl">
              دوره‌های ویدیویی رایگان و تخصصی بازار سرمایه، تحلیل بورس و مهارت‌های مالی
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button className="btn bg-hoboc hover:bg-hoboc-dark text-white px-8 py-3 rounded-xl font-semibold text-lg transition">
                ثبت‌نام رایگان
              </button>
              <button className="btn bg-white border border-hoboc text-hoboc hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold text-lg transition">
                ورود کاربران
              </button>
            </div>
          </div>
        </section>

        {/* Categories Tabs */}
        <section className="container mx-auto px-4 mt-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            <button className="px-4 py-2 rounded-full bg-hoboc text-white font-medium hover:bg-hoboc-dark transition">
              همه دوره‌ها
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white transition">
              دوره‌های پیشنهادی
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white transition">
              مهارت‌های پایه
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white transition">
              تحلیل تکنیکال
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white transition">
              مالی و سرمایه‌گذاری
            </button>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-16">
          {sampleCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-hoboc flex flex-col overflow-hidden transition hover:shadow-md"
            >
              <div className="h-40 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1" dir="rtl">
                {course.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4" dir="rtl">
                {course.desc}
              </p>
              <div className="flex justify-between mt-auto items-end">
                <span className="text-hoboc text-sm font-semibold">رایگان</span>
                <a
                  href="#"
                  className="text-hoboc font-medium hover:underline flex items-center gap-1"
                >
                  مشاهده دوره
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Banner */}
        <section className="w-full bg-hoboc/10 py-10 mt-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <h2 className="font-bold text-2xl text-hoboc-dark mb-2" dir="rtl">همین حالا مسیر یادگیری خود را شروع کنید!</h2>
              <p className="text-hoboc-dark text-base" dir="rtl">
                با ثبت‌نام و حضور در دوره‌های آموزشی، حرفه‌ای شوید و وارد بازار کار شوید.
              </p>
            </div>
            <button className="btn bg-hoboc hover:bg-hoboc-dark text-white px-8 py-3 rounded-xl font-bold text-lg transition">
              مشاهده همه دوره‌ها
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
