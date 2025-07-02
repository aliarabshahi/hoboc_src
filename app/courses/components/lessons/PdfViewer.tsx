"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ZoomIn, ZoomOut, Download, Maximize, Minimize } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer = ({ pdfUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    checkIfMobile();
    updateWidth();
    
    window.addEventListener('resize', () => {
      checkIfMobile();
      updateWidth();
    });

    return () => {
      window.removeEventListener('resize', () => {
        checkIfMobile();
        updateWidth();
      });
    };
  }, [isFullscreen]);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'border rounded-lg shadow-lg overflow-hidden'} flex flex-col h-full`}>
      {/* Enhanced Dark Top Controls Bar */}
      <div className="bg-gray-800 border-gray-700 flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPdf}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
            title="دانلود"
          >
            <Download size={isMobile ? 16 : 18} />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-700 rounded-md p-1">
            <button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className={`p-2 rounded-md ${scale <= 0.5 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-600 text-gray-200 hover:text-white'} transition-colors`}
              title="کوچک‌نمایی"
            >
              <ZoomOut size={isMobile ? 16 : 18} />
            </button>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-200 px-1`}>
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 2.5}
              className={`p-2 rounded-md ${scale >= 2.5 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-600 text-gray-200 hover:text-white'} transition-colors`}
              title="بزرگ‌نمایی"
            >
              <ZoomIn size={isMobile ? 16 : 18} />
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
            title={isFullscreen ? "خروج از حالت تمام صفحه" : "حالت تمام صفحه"}
          >
            {isFullscreen ? <Minimize size={isMobile ? 16 : 18} /> : <Maximize size={isMobile ? 16 : 18} />}
          </button>
        </div>
      </div>

      {/* PDF Content */}
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

      {/* Bottom Navigation Bar */}
      <div className="bg-gray-800 border-t border-gray-700 flex items-center justify-between p-3">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-base'} rounded-md font-medium transition-colors ${
            pageNumber <= 1 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : "bg-hoboc text-white hover:bg-hoboc-dark"
          }`}
        >
          قبلی
        </button>
        
        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-200`}>
          صفحه {pageNumber} از {numPages || '--'}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={!numPages || pageNumber >= numPages}
          className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-base'} rounded-md font-medium transition-colors ${
            !numPages || pageNumber >= numPages 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : "bg-hoboc text-white hover:bg-hoboc-dark"
          }`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;