"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Loader2 } from "lucide-react";

// Initialize PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

const ResumePopup = ({ isOpen, onClose, resumeUrl }: ResumePopupProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-4xl h-[80vh] overflow-y-auto">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <div className="mt-4">
          <Document
            file={resumeUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            }
            error={
              <div className="text-error text-center p-4">
                <p>Failed to load PDF file.</p>
                <p className="text-sm mt-2">
                  Please try again later or contact support if the issue
                  persists.
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={Math.min(window.innerWidth * 0.8, 800)}
              loading={
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }
            />
          </Document>
          {numPages && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="btn btn-primary btn-sm"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </button>
              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>
              <button
                className="btn btn-primary btn-sm"
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ResumePopup;
