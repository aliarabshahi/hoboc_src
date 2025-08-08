// components/vision/VisionTexts.tsx
import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";

const visions = [
  {
    title: "آموزش و رشد حرفه‌ای",
    description: "مهارت‌های عملی و بازارمحور داده‌کاوی، مهندسی داده و تحلیل پیشرفته رو با ما یاد بگیر و به سطح بعدی برس.",
    linkText: "کلیک کن، شروع کن!",
    link: "/courses",
  },
  {
    title: "همکاری تو پروژه‌ها",
    description: "بی‌صبرانه منتظریم تو رو تو تیم داده‌محورمون داشته باشیم! پروژه‌های جذاب و چالش‌برانگیز منتظر توئه.",
    linkText: "بزن بریم!",
    link: "/jobs",
  },
  {
    title: "طراحی پایپ‌لاین‌های داده",
    description: "از داده‌های خام تا تحلیل‌های طلایی؛ همراهتیم پایپ‌لاین‌هایی بسازیم که کسب‌وکارت رو متحول کنه.",
    linkText: "پروژه‌ات رو ثبت کن",
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
            <h3 className="text-xl md:text-xl font-bold text-gray-800 group-hover:text-white">
              {vision.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 group-hover:text-white">
              {vision.description}
            </p>
            <p className="text-xs md:text-sm text-hoboc-dark border-b border-hoboc group-hover:text-white group-hover:border-white inline-block">
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
