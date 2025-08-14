"use client";

import { useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";

export default function NewHero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white relative z-0" dir="rtl">
      <div className="relative isolate px-6 lg:px-8">
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
        <div className="mx-auto max-w-2xl pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12">
          {/* Video trigger pill */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <button
              onClick={() => setShowVideo(true)}
              className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                         text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out"
            >
              <IoPlayCircleSharp
                className="text-xl text-gray-500 transition-colors duration-300 group-hover:text-red-500 
                           group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
              <span>ما کی هستیم؟!</span>
            </button>
          </div>

          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
              از داده خام تا <span className="text-hoboc-dark">ارزش واقعی</span>
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              با ما مهارت‌های داده‌کاوی، مهندسی داده و تحلیل پیشرفته رو یاد بگیر
              تا بتونی از داده‌ها ارزش بسازی، پایپ‌لاین‌های بهینه طراحی کنی و
              کسب‌وکار رو با بینش‌های عمیق متحول کنی.
            </p>

            {/* Button */}
            <div className="flex items-center justify-center">
              <a
                href="/courses"
                className="rounded-md bg-hoboc-dark px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-hoboc focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark transition-colors"
              >
                شروع یادگیری
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

      {/* Video modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4">
          <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-gray-900">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 left-4 z-10 text-gray-300 hover:text-white text-2xl font-bold transition-colors"
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                className="w-full h-[400px] sm:h-[500px]"
                src="https://www.youtube.com/embed/your-video-id"
                title="معرفی من"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
