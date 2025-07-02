"use client";

import React from "react";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default PdfViewer;
