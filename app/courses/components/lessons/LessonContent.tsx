'use client';
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';
import { FaFilePdf, FaVideo, FaImage, FaDownload, FaArrowLeft, FaChevronRight, FaChevronLeft, FaExpand } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface LessonContentProps {
  topicSlug: string;
  lessonSlug: string;
}

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => numPages && setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300 ${
      isFullscreen ? 'fixed inset-0 z-50 bg-white p-4' : ''
    }`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between bg-gray-800 text-white p-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="p-1 rounded hover:bg-gray-700 disabled:opacity-50">
            <FaChevronLeft />
          </button>
          <span className="text-sm">صفحه {pageNumber} از {numPages || '--'}</span>
          <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 0)} className="p-1 rounded hover:bg-gray-700 disabled:opacity-50">
            <FaChevronRight />
          </button>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button onClick={zoomOut} disabled={scale <= 0.5} className="text-sm p-1 rounded hover:bg-gray-700 disabled:opacity-50">
            کوچک‌تر
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} disabled={scale >= 2.5} className="text-sm p-1 rounded hover:bg-gray-700 disabled:opacity-50">
            بزرگ‌تر
          </button>
          <button onClick={toggleFullscreen} className="p-1 rounded hover:bg-gray-700">
            <FaExpand />
          </button>
          <a href={pdfUrl} download className="flex items-center p-1 rounded hover:bg-gray-700">
            <FaDownload className="ml-1" /> دانلود
          </a>
        </div>
      </div>

      {/* PDF Document */}
      <div className="flex justify-center overflow-auto p-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>در حال بارگیری PDF...</p>
          </div>}
          error={<div className="flex flex-col items-center justify-center h-64 text-red-500">
            <p>خطا در بارگیری فایل PDF</p>
            <p className="text-sm mt-2">لطفاً اطمینان حاصل کنید که آدرس فایل صحیح است</p>
          </div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>در حال بارگیری صفحه...</p>
            </div>}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
};

const LessonContent = async ({ topicSlug, lessonSlug }: LessonContentProps) => {
  const response = await getApiData(`/course-lessons/?slug=${lessonSlug}`);

  if (response.error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" dir="rtl">
      {response.error}
    </div>;
  }

  if (response.message) {
    return <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" dir="rtl">
      {response.message}
    </div>;
  }

  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else {
    lessonData = response.data;
  }

  if (!lessonData) {
    return <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" dir="rtl">
      درس مورد نظر یافت نشد
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6" dir="rtl">
      <Link href={`/courses/${topicSlug}`} className="flex items-center text-blue-600 mb-4">
        <FaArrowLeft className="ml-2" />
        بازگشت به لیست دروس
      </Link>

      {/* Lesson header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{lessonData.title}</h1>
          <p className="text-gray-600 mb-4">{lessonData.description}</p>
        </div>
      </div>

      {/* PDF Section - Only show if pdf_file exists */}
      {lessonData.pdf_file ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <FaFilePdf className="text-red-500 ml-2" />
            <h2 className="text-lg font-semibold text-gray-800">فایل PDF درس</h2>
          </div>
          <div className="p-4">
            <PDFViewer pdfUrl={lessonData.pdf_file} />
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" dir="rtl">
          <p>فایل PDF برای این درس موجود نیست</p>
        </div>
      )}

      {/* Video Section */}
      {lessonData.video_file || lessonData.video_url ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <FaVideo className="text-blue-500 ml-2" />
            <h2 className="text-lg font-semibold text-gray-800">ویدیوی آموزشی</h2>
          </div>
          <div className="p-4">
            {lessonData.video_url ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={lessonData.video_url}
                  className="w-full h-64 md:h-96 rounded-md"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : lessonData.video_file ? (
              <div className="aspect-w-16 aspect-h-9">
                <video 
                  controls 
                  className="w-full h-64 md:h-96 rounded-md"
                  src={lessonData.video_file}
                >
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Thumbnail Image */}
      {lessonData.thumbnail && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <FaImage className="text-green-500 ml-2" />
            <h2 className="text-lg font-semibold text-gray-800">تصویر درس</h2>
          </div>
          <div className="p-4 flex justify-center">
            <div className="relative w-full max-w-md h-64">
              <Image
                src={lessonData.thumbnail}
                alt={lessonData.title}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonContent;