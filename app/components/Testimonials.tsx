import Image from "next/image";

export default function TestimonialPersian() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gray-900 py-24 sm:py-32 font-vazir"
    >
      {/* تصویر پس‌زمینه */}
      {/* <Image
        alt=""
        src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        fill
        className="absolute inset-0 object-cover brightness-150 saturate-0"
      /> */}

      {/* لایه تیره */}
      <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />

      {/* گرادیان‌ها */}
      <div
        aria-hidden="true"
        className="absolute -left-80 -top-56 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
        />
      </div>

      {/* محتوا */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* <Image
            alt="لوگو"
            src="https://tailwindui.com/plus-assets/img/logos/workcation-logo-white.svg"
            width={160}
            height={50}
            className="mx-auto"
          /> */}
          <figure>
            <blockquote className="mt-6 text-2xl font-semibold text-white leading-relaxed">
              <p>
                «داده مثل طلا و پول است؛  
                هرچه بهتر آن را استخراج و استفاده کنید،  
                ثروت و ارزش بیشتری خلق خواهید کرد.»
              </p>
            </blockquote>
            {/* <figcaption className="mt-6 text-base text-gray-300">
              <div className="font-semibold">علی آرا</div>
              <div className="mt-1">
                مهندس داده · مشاور پروژه
              </div>
            </figcaption> */}
          </figure>
        </div>
      </div>
    </section>
  );
}
