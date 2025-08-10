export default function Newsletter() {
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-hoboc-dark">
          عضویت در خبرنامه
        </h2>
        <p className="mb-6 text-gray-600">
          با عضویت در خبرنامه، جدیدترین دوره‌ها و مطالب آموزشی رو دریافت کنید.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="ایمیل شما"
            className="px-4 py-2 border rounded w-full"
          />
          <button className="px-6 py-2 bg-hoboc-dark text-white rounded hover:bg-hoboc">
            عضویت
          </button>
        </form>
      </div>
    </section>
  );
}
