// components/vision/VisionTexts.tsx
"use client";

import Link from "next/link";
import { 
  FaChalkboardTeacher, 
  FaProjectDiagram, 
  FaSitemap, 
  FaPodcast,
  FaArrowLeft
} from "react-icons/fa";
import { motion } from "framer-motion";

const visions = [
  {
    title: "آموزش و رشد حرفه‌ای",
    link: "/courses",
    icon: FaChalkboardTeacher,
  },
  {
    title: "همکاری تو پروژه‌ها",
    link: "/join-us",
    icon: FaProjectDiagram,
  },
  {
    title: "سفارش پروژه",
    link: "/services",
    icon: FaSitemap,
  },
  {
    title: "پادکست",
    link: "/podcast",
    icon: FaPodcast,
  },
];

export default function VisionTexts() {
  return (
    <div className="space-y-4 w-full" dir="rtl">
      {visions.map((vision, index) => {
        const Icon = vision.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href={vision.link}
              className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
            >
              {/* Icon with subtle animation */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 flex justify-center items-center rounded-lg bg-gray-100 text-hoboc"
              >
                <Icon size={20} />
              </motion.div>

              {/* Text content */}
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {vision.title}
                </h3>
              </div>

              {/* Arrow indicator */}
              <FaArrowLeft className="text-gray-400 text-sm" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}