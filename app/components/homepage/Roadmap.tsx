export default function Roadmap() {
  const steps = [
    "مبانی پایگاه داده و SQL",
    "Python برای مهندسی داده",
    "ETL و ELT",
    "معماری داده",
    "پایپ‌لاین داده پیشرفته",
  ];
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-hoboc-dark">
          مسیر یادگیری مهندسی داده
        </h2>
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, i) => (
            <div key={i} className="p-4 bg-gray-50 shadow rounded-lg text-center">
              <span className="block text-hoboc-dark font-bold mb-2">
                گام {i + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
