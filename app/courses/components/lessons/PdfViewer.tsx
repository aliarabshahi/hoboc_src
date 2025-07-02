"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ZoomIn, ZoomOut, Download, Maximize, Minimize } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfViewerProps {
  pdfUrl: string;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

const PdfViewer = ({ pdfUrl, isFullscreen, onFullscreenToggle }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [isFullscreen]); // Added isFullscreen as dependency

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => numPages && setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'border rounded-lg shadow-lg'} flex flex-col h-full`}>
      {/* Top Controls Bar */}
      <div className="bg-white border-b flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPdf}
            className="p-2 rounded hover:bg-gray-100 text-gray-700"
            title="دانلود"
          >
            <Download size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className={`p-2 rounded ${scale <= 0.5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
              title="کوچک‌نمایی"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium text-gray-700">{Math.round(scale * 100)}%</span>
            <button
              onClick={zoomIn}
              disabled={scale >= 2.5}
              className={`p-2 rounded ${scale >= 2.5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
              title="بزرگ‌نمایی"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          <button
            onClick={onFullscreenToggle}
            className="p-2 rounded hover:bg-gray-100 text-gray-700"
            title={isFullscreen ? "خروج از حالت تمام صفحه" : "حالت تمام صفحه"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {/* PDF Content - Full width with no padding */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-white w-full flex justify-center"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="flex items-center justify-center h-full">در حال بارگذاری سند...</div>}
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth * scale}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            loading={<div className="flex items-center justify-center h-full">در حال بارگذاری صفحه...</div>}
          />
        </Document>
      </div>

      {/* Bottom Navigation Bar - Buttons on sides */}
      <div className="bg-white border-t flex items-center justify-between p-3">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className={`px-5 py-2 rounded-md text-base font-medium transition-colors ${
            pageNumber <= 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-hoboc text-white hover:bg-hoboc-dark'
          }`}
        >
          قبلی
        </button>
        
        <span className="text-sm font-medium text-gray-700">
          صفحه {pageNumber} از {numPages || '--'}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={!numPages || pageNumber >= numPages}
          className={`px-5 py-2 rounded-md text-base font-medium transition-colors ${
            !numPages || pageNumber >= numPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-hoboc text-white hover:bg-hoboc-dark'
          }`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;