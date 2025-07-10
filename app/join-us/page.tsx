"use client";

import { useEffect, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumeImage from "./components/ResumeImage";

function ResumeFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
  );
}

export default function ResumePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ResumeImage />
          </div>

          {/* Form or Skeleton */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? <ResumeFormSkeleton /> : <ResumeForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
