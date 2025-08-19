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
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100"
  },
  {
    title: "همکاری تو پروژه‌ها",
    link: "/join-us",
    icon: FaProjectDiagram,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100"
  },
  {
    title: "سفارش پروژه",
    link: "/services",
    icon: FaSitemap,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100"
  },
  {
    title: "پادکست",
    link: "/podcast",
    icon: FaPodcast,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100"
  },
];

export default function VisionTexts() {
  return (
    <div className="space-y-3 w-full" dir="rtl">
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
              className={`flex items-center p-4 rounded-lg transition-colors duration-200 border border-gray-100 ${vision.hoverColor}`}
            >
              {/* Animated colorful icon */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                className={`w-12 h-12 flex justify-center items-center rounded-lg ${vision.bgColor} ${vision.iconColor}`}
              >
                <Icon size={20} className="opacity-90" />
              </motion.div>

              {/* Text content */}
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {vision.title}
                </h3>
              </div>

              {/* Arrow indicator - colored on hover */}
              <FaArrowLeft className="text-gray-400 group-hover:text-current text-sm" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}