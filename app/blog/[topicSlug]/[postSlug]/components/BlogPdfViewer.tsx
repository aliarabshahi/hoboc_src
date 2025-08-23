"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Download, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfViewerProps {
  pdfUrl: string;
}

const BlogPdfViewer = ({ pdfUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const originalWidthRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const minScale = 0.5;
  const maxScale = 2;
  const scaleStep = 0.25;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        if (!isFullscreen) {
          originalWidthRef.current = width;
        }
      }
    };

    checkIfMobile();
    updateWidth();

    const handleResize = () => {
      checkIfMobile();
      updateWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber(prev => Math.min(prev + 1, numPages));
      scrollToTop();
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + scaleStep, maxScale));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - scaleStep, minScale));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      originalWidthRef.current = containerRef.current?.offsetWidth || 0;
    }
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) setScale(1);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full py-16">
      <FaSpinner className="animate-spin text-4xl text-hoboc" />
    </div>
  );

  const PageLoadingSpinner = () => (
    <div className="flex items-center justify-center h-full py-16">
      <FaSpinner className="animate-spin text-3xl text-hoboc" />
    </div>
  );

  const viewerBlock = (
    <div className={`${isFullscreen ? 'fixed inset-0 z-999 bg-white' : 'border rounded-lg shadow-lg overflow-hidden'} flex flex-col h-full`}>
      {/* Top Bar */}
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

        <div className="flex items-center gap-2">
          {isFullscreen && (
            <>
              <button
                onClick={zoomOut}
                disabled={scale <= minScale}
                className="p-2 rounded-md hover:bg-gray-700 text-gray-200 hover:text-white transition-colors disabled:opacity-50"
                title="کوچک‌نمایی"
              >
                <ZoomOut size={isMobile ? 16 : 18} />
              </button>

              <span
                className="text-sm font-medium text-gray-200 cursor-pointer px-2"
                onClick={resetZoom}
                title="بازنشانی اندازه"
              >
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={scale >= maxScale}
                className="p-2 rounded-md hover:bg-gray-700 text-gray-200 hover:text-white transition-colors disabled:opacity-50"
                title="بزرگ‌نمایی"
              >
                <ZoomIn size={isMobile ? 16 : 18} />
              </button>
            </>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
            title={isFullscreen ? "خروج از حالت تمام صفحه" : "حالت تمام صفحه"}
          >
            {isFullscreen ? <Minimize size={isMobile ? 16 : 18} /> : <Maximize size={isMobile ? 16 : 18} />}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-white w-full flex justify-center"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<LoadingSpinner />}
        >
          <Page
            pageNumber={pageNumber}
            width={isFullscreen ? containerWidth * scale : originalWidthRef.current}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            loading={<PageLoadingSpinner />}
          />
        </Document>
      </div>

      {/* Bottom Navigation */}
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

  if (isFullscreen && isClient) {
    return createPortal(viewerBlock, document.body);
  }
  return viewerBlock;
};

export default BlogPdfViewer;
