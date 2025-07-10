"use client";

import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactImage from "./components/ContactImage";
import ContactDetail from "./components/ContactDetail";

// Skeleton loader rectangle for the form
function ContactFormSkeleton() {
  return (
    <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-6" />
  );
}

export default function ContactPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading delay, adjust as needed
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ContactImage />
          </div>

          {/* Form and Detail */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? <ContactFormSkeleton /> : <ContactForm />}
            <ContactDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
