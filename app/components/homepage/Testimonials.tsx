export default function Testimonials() {
  const feedbacks = [
    { name: "علی", text: "دوره‌ها عالی و کاملاً کاربردی بودن!" },
    { name: "سارا", text: "یکی از بهترین مدرس‌هایی که تجربه کردم." },
  ];

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-hoboc-dark mb-8">
          نظرات دانشجویان
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {feedbacks.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <p className="text-gray-600 mb-4">“{f.text}”</p>
              <span className="font-semibold text-hoboc-dark">{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
