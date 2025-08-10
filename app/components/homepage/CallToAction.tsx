import Image from "next/image";
import backgroundImage from "@/public/background-call-to-action.jpg";

export default function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      {/* پس‌زمینه اصلی */}
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
        priority
      />

      {/* محتوای وسط، مشابه Container اصلی */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            همین امروز شروع کن
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            مسیر یادگیری مهندسی داده را کوتاه و کاربردی کن. همین الان ثبت‌نام کن.
          </p>
          <a
            href="/register"
            className="mt-10 inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow hover:bg-gray-100 transition"
          >
            آموزش رایگان
          </a>
        </div>
      </div>
    </section>
  );
}
