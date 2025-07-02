"use client";

import React from "react";

const PdfViewer: React.FC = () => {
  // Replace this with your actual local PDF URL
  const pdfUrl =
    "http://localhost/hoboc/media/courses/lessons/pdfs/دوره_ایرفلو_RvuTMEe.pdf";

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
