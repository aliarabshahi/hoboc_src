// roadmap/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Roadmap } from "./components/Rodmap";
import RoadmapImage from "./components/RoadmapImage";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";

// Simple skeleton that matches Roadmap width
function RoadmapSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full h-[800px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
    </div>
  );
}

const roadmapData: RoadmapItemType[] = [
  {
    id: '1',
    title: 'مفاهیم مقدماتی از مهندسی داده',
    description: 'آشنایی با اصول اولیه مهندسی داده و معماری سیستم‌های داده',
    level: 'مبتدی',
    status: 'تکمیل شده',
    resources: [
      { title: 'مقاله مهندسی داده چیست؟', url: '#' },
      { title: 'معماری سیستم‌های داده', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'داکر، آشنایی و کار با کانتینرها',
    description: 'یادگیری مفاهیم کانتینریزاسیون و پیاده‌سازی با داکر',
    level: 'مبتدی',
    status: 'در حال یادگیری',
    resources: [
      { title: 'داکر از صفر تا صد', url: '#' },
      { title: 'Docker Documentation', url: '#' }
    ]
  }
];

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start pt-12">
            <RoadmapImage />
          </div>

          {/* Roadmap content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? (
              <RoadmapSkeleton />
            ) : (
              <Roadmap 
                title="نقشه راه جامع مهندسی داده"
                description="مسیر یادگیری مهارت‌های ضروری برای تبدیل شدن به یک مهندس داده حرفه‌ای"
                roadmapData={roadmapData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}