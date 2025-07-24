"use client";

import { useEffect, useState } from "react";
import NotificationForm from "./components/NotificationForm";
import NotificationImage from "./components/NotificationImage";

// 🔹 Skeleton for form loading state
function NotificationFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
  );
}

export default function NotificationPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image: left on desktop */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:sticky lg:top-0 self-start pt-8">

            <NotificationImage />
          </div>

          {/* Form: right on desktop */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            {loading ? <NotificationFormSkeleton /> : <NotificationForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
