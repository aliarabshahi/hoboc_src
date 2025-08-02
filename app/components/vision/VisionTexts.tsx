// components/vision/VisionTexts.tsx
import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";

const visions = [
  {
    title: "آموزش و رشد",
    description: "آموزش‌های کاربردی برای توسعه مهارت‌های بازار محور و پیشرفت حرفه‌ای.",
    linkText: "مشاهده دوره‌ها",
    link: "/courses",
  },
  {
    title: "همکاری با متخصصان",
    description: "با پیوستن به شبکه ما در پروژه‌های داده‌محور واقعی مشارکت کنید.",
    linkText: "ارسال اطلاعات",
    link: "/jobs",
  },
  {
    title: "پایپ‌لاین داده",
    description: "طراحی و پیاده‌سازی مسیر تبدیل داده خام به بینش ارزشمند برای شرکت‌ها.",
    linkText: "ثبت پروژه",
    link: "/services",
  },
];

export default function VisionTexts({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""} space-y-0.5`} dir="rtl">
      {visions.map((vision, index) => (
        <Link
          key={index}
          href={vision.link}
          className="flex items-center p-3 md:p-5 rounded-lg cursor-pointer group hover:bg-hoboc hover:text-white transition-colors"
        >
          <div className="flex-grow space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-white">
              {vision.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 group-hover:text-white">
              {vision.description}
            </p>
            <p className="text-xs md:text-sm text-hoboc border-b border-hoboc group-hover:text-white group-hover:border-white inline-block">
              {vision.linkText}
            </p>
          </div>

          <div className="w-6 md:w-8 flex justify-center items-center mr-3 md:mr-8">
            <BiSolidLeftArrow className="text-hoboc group-hover:text-white text-xs md:text-sm" />
          </div>
        </Link>
      ))}
    </div>
  );
}
