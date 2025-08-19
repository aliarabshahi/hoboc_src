"use client";

interface CourseHeaderProps {
  title: string;
  description: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description }) => {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-16 shadow-sm rounded-b-2xl">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[30rem] h-[30rem] bg-[#A3DC9A] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-[10%] right-[-10%] w-[25rem] h-[25rem] bg-[#DEE791] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[15%] w-[28rem] h-[28rem] bg-[#FFF9BD] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-15%] right-[5%] w-[26rem] h-[26rem] bg-[#FFD6BA] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10" dir="rtl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default CourseHeader;
