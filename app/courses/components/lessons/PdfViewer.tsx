"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set correct workerSrc — use the same version as pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    console.log("PDF Viewer trying to load:", pdfUrl);
    fetch(pdfUrl)
      .then(res => console.log("PDF fetch status:", res.status))
      .catch(err => console.error("PDF fetch error:", err));
  }, [pdfUrl]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100 p-4 rounded-2xl shadow-md">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="در حال بارگذاری PDF..."
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={800}
            renderAnnotationLayer={false}
            renderTextLayer={true}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
