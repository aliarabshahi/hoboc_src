"use client";

interface CourseHeaderProps {
  title: string;
  description: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description }) => {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-10 shadow rounded-b-xl bg-white">
      {/* LEFT gradient blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* RIGHT gradient blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 drop-shadow-sm"
          dir="rtl"
        >
          {title}
        </h1>
        <p
          className="text-gray-600 md:text-lg max-w-2xl mx-auto drop-shadow-sm"
          dir="rtl"
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default CourseHeader;
