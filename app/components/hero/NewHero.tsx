"use client";

import { useState } from "react";

export default function NewHero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white relative z-0" dir="rtl">
      <div className="relative isolate px-6 pt-10 lg:px-8">
        {/* Top background blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none sm:-top-60"
        >
          <div
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] 
              translate-x-1/2 rotate-[30deg] bg-gradient-to-tr 
              from-[#ff80b5] to-[#9089fc] opacity-30 
              sm:right-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl py-12 sm:py-16 lg:py-20">
          {/* Video trigger pill */}
          <div className="hidden sm:mb-6 sm:flex sm:justify-center">
            <button
              onClick={() => setShowVideo(true)}
              className="relative rounded-full px-4 py-1.5 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-hoboc transition hover:text-white hover:bg-hoboc-dark"
            >
              ویدئو معرفی من رو ببین
            </button>
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-snug sm:text-5xl">
              از داده خام تا <span className="text-hoboc-dark">ارزش واقعی</span>
            </h1>
            <p className="text-base font-medium text-gray-600 sm:text-lg leading-relaxed">
              با ما مهارت‌های داده‌کاوی، مهندسی داده و تحلیل پیشرفته رو یاد بگیر
              تا بتونی از داده‌ها ارزش بسازی، پایپ‌لاین‌های بهینه طراحی کنی و
              کسب‌وکار رو با بینش‌های عمیق متحول کنی.
            </p>

{/* Buttons */}
<div className="flex flex-row-reverse items-center justify-center gap-x-4 pt-2">
  <a
    href="/courses"
    className="rounded-md bg-hoboc-dark px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-hoboc focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark"
  >
    شروع یادگیری
  </a>
  <a
    href="/services"
    className="flex items-center text-sm font-semibold text-gray-900 hover:text-hoboc-dark transition"
  >
    خدمات داده
    <span className="mr-1">←</span>
  </a>
</div>

          </div>
        </div>

        {/* Bottom background blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-8rem)] 
            -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none sm:top-[calc(100%-20rem)]"
        >
          <div
            className="relative right-[calc(50%+3rem)] aspect-[1155/678] w-[30rem] 
              translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] 
              opacity-30 sm:right-[calc(50%+36rem)] sm:w-[60rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* Simple video modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px]"
                src="https://www.youtube.com/embed/your-video-id"
                title="معرفی من"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
