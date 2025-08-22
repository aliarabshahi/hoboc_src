"use client";

import {
  FaBookOpen,
  FaProjectDiagram,
  FaHandshake,
  FaHeadphonesAlt,
} from "react-icons/fa";
import VisionCard from "./VisionCard";

export default function VisionTexts() {
  // Vision cards data is now defined here directly
  const visions = [
    {
      title: "آموزش و رشد حرفه‌ای",
      link: "/courses",
      icon: FaBookOpen,
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-50",
      hoverColor: "hover:bg-cyan-100",
    },
    {
      title: "همکاری با ما",
      link: "/join-us",
      icon: FaProjectDiagram,
      iconColor: "text-rose-400",
      bgColor: "bg-rose-50",
      hoverColor: "hover:bg-rose-100",
    },
    {
      title: "سفارش پروژه",
      link: "/join-us",
      icon: FaHandshake,
      iconColor: "text-green-400",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "پادکست",
      link: "/podcast",
      icon: FaHeadphonesAlt,
      iconColor: "text-pink-400",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
  ];

  return (
    <div className="space-y-3 w-full" dir="rtl">
      {visions.map((vision, index) => (
        <VisionCard key={vision.title} {...vision} delay={index * 0.1} />
      ))}
    </div>
  );
}
